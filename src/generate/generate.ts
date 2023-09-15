import * as fs from "fs";
import { GlobOptions, globStream } from "glob";
import { TuningResourceType } from "@s4tk/models/enums";
import { XmlNode, XmlCommentNode, XmlDocumentNode, XmlElementNode, XmlValueNode } from "@s4tk/xml-dom";
import { RecycledNodesCache, XmlParsingOptions } from "@s4tk/xml-dom/lib/types";

interface Node {
    data: {
        Class?: string,
        Instance?: string,
        Module?: string,
        Name: string,
        id: string,
        File: string,
    }
}

interface Edge {
    data: {
        source: string,
        target: string,
    }
}

interface Elements {
    edges: Edge[];
    nodes: Node[];
}

function* scanXml(xml: XmlNode): Generator<string> {
    if (xml instanceof XmlElementNode && xml.children.length == 2 && xml.children[1] instanceof XmlCommentNode) {
        const val = xml.innerValue.toString();
        if (val.includes("<!DOCTYPE")) {
            console.log(xml, "had inner value", val);
            process.exit();
        }
        yield val;
    }/* else if (xml instanceof XmlValueNode) {
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
    const root = "D:/XMLExtractor"
    const options: GlobOptions = {
        absolute: true,
        cwd: root
    };
    var packages = globStream("**/*.xml", options);
    var xmlOptions: XmlParsingOptions = {
        recycleNodes: true
    };
    const seenTuningIDs = new Map<string, string>();
    packages.on('data', (file) => {
        const buffer = fs.readFileSync(file.toString());
        const res = XmlDocumentNode.fromRecycled(buffer, xmlOptions);
        if (typeof xmlOptions.recycledNodesCache === "undefined") {
            xmlOptions.recycledNodesCache = res.recyclingCache;
        }
        var xml = res.doc.child;
        const attr = TuningResourceType.parseAttr(xml.attributes.i);
        if (TuningResourceType.getAttr(attr) != xml.attributes.i) {
            // console.log("skipping", file, "since", xml.attributes.i, "!=", TuningResourceType.getAttr(attr));
            return;
        }
        if (seenTuningIDs.has(xml.id.toString())) {
            console.log(file, "is a duplicate of", seenTuningIDs.get(xml.id.toString()), "?");
            return;
        }
        seenTuningIDs.set(xml.id.toString(), file.toString());

        var node: Node = {
            data: {
                id: xml.id.toString(),
                Name: xml.name,
                File: file.toString(),
            }
        };
        for (const [key, value] of Object.entries(xml.attributes)) {
            switch(key) {
                case 'c':
                    node.data.Class = value; break;
                case 'i':
                    node.data.Instance = value; break;
                case 'm':
                    node.data.Module = value; break;
            }
        }

        eles.nodes.push(node);
        const seen = new Set<string>();
        for (const ref of scanXml(xml)) {
            if (seen.has(ref))
                continue;
            const edge: Edge = {
                data: {
                    source: xml.id.toString(),
                    target: ref
                }
            };
            eles.edges.push(edge);
            seen.add(ref);
        }
        if (eles.nodes.length % 1000 == 0) {
            console.log(eles.nodes.length, eles.edges.length);
        }
    });
    const p = fs.realpathSync("data") + "/elements.json";
    console.log(p);
    packages.on("end", () => {
        fs.writeFileSync(p, JSON.stringify(eles));
        console.log(p);
    });
}

generate();
