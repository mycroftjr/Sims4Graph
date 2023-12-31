import * as fs from "fs";
import path from "path";
import { GlobOptions, globStream } from "glob";
import { TuningResourceType } from "@s4tk/models/enums";
import { ResourceKey } from "@s4tk/models/types";
import { XmlNode, XmlCommentNode, XmlDocumentNode, XmlElementNode } from "@s4tk/xml-dom";
import { XmlParsingOptions } from "@s4tk/xml-dom/lib/types";

import { convertToCSV } from "./convertToCSV";

export const TGI_REGEX = /(?<t>[0-9a-f]{8}).(?<g>[0-9a-f]{8}).(?<i>[0-9a-f]{16})/i;

function parseTGI(filepath: string): ResourceKey {
	let tgi = path.basename(filepath);
	if (tgi.startsWith('S4_'))  // s4pi format
		tgi = tgi.substring(3);

	const match = TGI_REGEX.exec(tgi);
	if (match?.groups) {
		const { t, g, i } = match.groups;
		return {
			type: parseInt(t, 16),
			group: parseInt(g, 16),
			instance: BigInt("0x" + i),
		};
	} else {
		console.log("failed to parse", tgi);
		process.exit(1);
	}
}

interface Node {
	Class?: string,
	Instance?: string,
	Module?: string,
	name: string,
	id: string,
	Pack?: string,
	Group?: string,
}

interface Edge {
	source: string,
	target: string,
}

interface Elements {
	edges: Edge[];
	nodes: Node[];
}

export { Node, Edge, Elements };

function* scanXml(xml: XmlNode): Generator<string> {
	if (xml instanceof XmlElementNode && xml.children.length == 2 && xml.children[1] instanceof XmlCommentNode) {
		const comment = xml.children[1].value.toString();
		if (!comment.startsWith("String: ") && !comment.startsWith('"')) {
			const val = BigInt(xml.innerValue).toString(16).toUpperCase();
			if (val.includes("<!DOCTYPE") || val.startsWith("0x")) {
				console.log(xml, "had inner value", val);
				process.exit();
			}
			yield val;
		}
	} /* else if (xml instanceof XmlValueNode) {
		if (typeof xml.value == "number" || typeof xml.value == "bigint" && xml.value > 100)
			yield xml.value.toString();
	}*/ else if (xml.hasChildren) {
		for (const child of xml.children) {
			yield * scanXml(child);
		}
	}
}

function generate() {
	const eles: Elements = {edges: [], nodes: []};
	const root = "D:/S4TKXmlExtractor";
	const options: GlobOptions = {
		absolute: true,
		cwd: root
	};
	const packages = globStream("**/*.xml", options);
	const xmlOptions: XmlParsingOptions = {
		recycleNodes: true
	};
	// Map of Tuning ID to filename
	const seenTuningIDs = new Map<string, string>();
	// Map of i attribute to [parsed type, filename]
	const nonTuningTypes = new Map<string, [ResourceKey, string]>();
	packages.on('data', (file) => {
		const buffer = fs.readFileSync(file.toString());
		const res = XmlDocumentNode.fromRecycled(buffer, xmlOptions);
		if (typeof xmlOptions.recycledNodesCache === "undefined") {
			xmlOptions.recycledNodesCache = res.recyclingCache;
		}
		const xml = res.doc.child;
		const attr = TuningResourceType.parseAttr(xml.attributes.i);
		if (TuningResourceType.getAttr(attr) != xml.attributes.i) {
			if (!nonTuningTypes.has(xml.attributes.i)) {
				// console.log("skipping", file, "since", xml.attributes.i, "!=", TuningResourceType.getAttr(attr));
				const key = parseTGI(file.toString());
				const type = key.type;
				if ((type in TuningResourceType) || TuningResourceType.getAttr(type)) {
					console.log(xml.attributes.i, type.toString(16), "should have been",
						TuningResourceType[type], TuningResourceType.getAttr(type), file);
				}
				nonTuningTypes.set(xml.attributes.i, [key, file.toString()]);
			}
			return;
		}
		const id = BigInt(xml.id).toString(16).toUpperCase();
		if (!id) {
			console.log("id is", id, "for file", file);
		}
		if (seenTuningIDs.has(id)) {
			console.log(file, "is a duplicate of", seenTuningIDs.get(id), "?");
			return;
		}
		seenTuningIDs.set(id, file.toString());

		const node: Node = {
			id,
			name: xml.name,
		};
		for (const [key, value] of Object.entries(xml.attributes)) {
			switch(key) {
				case 'c':
					node.Class = value; break;
				case 'i':
					node.Instance = value; break;
				case 'm':
					node.Module = value; break;
			}
		}
		const group = parseTGI(file.toString()).group;
		if (group != 0) {
			node.Group = group.toString(16).toUpperCase();
		}
		
		const pack = path.relative(root, file.toString()).split(path.sep)[0];
		if (pack != "BG")
			node.Pack = pack;

		eles.nodes.push(node);
		const seen = new Set<string>();
		for (const target of scanXml(xml)) {
			if (seen.has(target))
				continue;
			const edge: Edge = {
				source: id,
				target
			};
			eles.edges.push(edge);
			seen.add(target);
		}
		if (eles.nodes.length % 1000 == 0) {
			console.log(eles.nodes.length, eles.edges.length);
		}
	});
	const p = fs.realpathSync("public") + "/elements.json";
	console.log(p);
	packages.on("end", () => {
		console.log(eles.nodes.length, eles.edges.length);
		eles.edges = eles.edges.filter((edge) => {
			const ret = seenTuningIDs.has(edge.source) && seenTuningIDs.has(edge.target);
			if (!ret)
				console.log("Invalid edge from", seenTuningIDs.get(edge.source), edge.source,
					BigInt("0x"+edge.source).toString(), "to", edge.target, BigInt("0x"+edge.target).toString());
			return ret;
		});
		console.log(eles.nodes.length, eles.edges.length);

		convertToCSV(eles);
		/*
		console.log("Instances that were not TuningTypes:");
		nonTuningTypes = new Map([...nonTuningTypes.entries()].sort());
		for (const [key, value] of nonTuningTypes) {
			console.log(key, `0x${value[0].type.toString(16).padStart(8, '0').toUpperCase()}`,
				value[0].instance.toString(), path.relative(root, value[1]));
		}
		*/
		fs.writeFileSync(p, JSON.stringify(eles));
		console.log(p);
	});
}

if (require.main === module) {
	generate();
}
