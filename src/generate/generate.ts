import * as fs from "fs";
import path from "path";
import { GlobOptions, globStream } from "glob";
import { TuningResourceType } from "@s4tk/models/enums";
import { ResourceKey } from "@s4tk/models/types";
import { XmlNode, XmlCommentNode, XmlDocumentNode, XmlElementNode, XmlValueNode } from "@s4tk/xml-dom";
import { RecycledNodesCache, XmlParsingOptions } from "@s4tk/xml-dom/lib/types";

export const TGI_REGEX = /(?<t>[0-9a-f]{8}).(?<g>[0-9a-f]{8}).(?<i>[0-9a-f]{16})/i;

function parseTGI(filepath: string): ResourceKey {
    var tgi = path.basename(filepath);
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

function* scanXml(xml: XmlNode): Generator<string> {
	if (xml instanceof XmlElementNode && xml.children.length == 2 && xml.children[1] instanceof XmlCommentNode) {
        if (!xml.children[1].value.toString().startsWith("String: ")) {
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
	var eles: Elements = {edges: [], nodes: []};
	const root = "D:/XMLExtractor";
	const options: GlobOptions = {
		absolute: true,
		cwd: root
	};
	var packages = globStream("**/*.xml", options);
	var xmlOptions: XmlParsingOptions = {
		recycleNodes: true
	};
	// Map of Tuning ID to filename
	const seenTuningIDs = new Map<string, string>();
    // Map of i attribute to [parsed type, filename]
    var nonTuningTypes = new Map<string, [ResourceKey, string]>();
	packages.on('data', (file) => {
		const buffer = fs.readFileSync(file.toString());
		const res = XmlDocumentNode.fromRecycled(buffer, xmlOptions);
		if (typeof xmlOptions.recycledNodesCache === "undefined") {
			xmlOptions.recycledNodesCache = res.recyclingCache;
		}
		var xml = res.doc.child;
		const attr = TuningResourceType.parseAttr(xml.attributes.i);
		if (TuningResourceType.getAttr(attr) != xml.attributes.i) {
            if (!nonTuningTypes.has(xml.attributes.i)) {
                // console.log("skipping", file, "since", xml.attributes.i, "!=", TuningResourceType.getAttr(attr));
                const key = parseTGI(file.toString());
                const type = key.type;
                if (type in TuningResourceType || TuningResourceType.getAttr(type) != null) {
                    console.log(xml.attributes.i, "should have been", TuningResourceType.getAttr(type), file);
                }
                nonTuningTypes.set(xml.attributes.i, [key, file.toString()]);
            }
			return;
		}
		const id = BigInt(xml.id).toString(16).toUpperCase();
		if (seenTuningIDs.has(id)) {
			console.log(file, "is a duplicate of", seenTuningIDs.get(id), "?");
			return;
		}
		seenTuningIDs.set(id, file.toString());

		var node: Node = {
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
	const p = fs.realpathSync("src/client/cy-conf") + "/elements.json";
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
        console.log("Instances that were not TuningTypes:");
        nonTuningTypes = new Map([...nonTuningTypes.entries()].sort());
        for (const [key, value] of nonTuningTypes) {
            console.log(key, `0x${value[0].type.toString(16).padStart(8, '0').toUpperCase()}`,
                value[0].instance.toString(), path.relative(root, value[1]));
        }
		fs.writeFileSync(p, JSON.stringify(eles));
		console.log(p);
	});
}

generate();
