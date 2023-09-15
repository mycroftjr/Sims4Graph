"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const glob_1 = require("glob");
const enums_1 = require("@s4tk/models/enums");
const xml_dom_1 = require("@s4tk/xml-dom");
function* scanXml(xml) {
    if (xml instanceof xml_dom_1.XmlElementNode && xml.children.length == 2 && xml.children[1] instanceof xml_dom_1.XmlCommentNode) {
        const val = xml.innerValue.toString();
        if (val.includes("<!DOCTYPE")) {
            console.log(xml, "had inner value", val);
            process.exit();
        }
        yield val;
    } /* else if (xml instanceof XmlValueNode) {
        if (typeof xml.value == "number" || typeof xml.value == "bigint" && xml.value > 100)
            yield xml.value.toString();
    }*/
    else if (xml.hasChildren) {
        for (const child of xml.children) {
            yield* scanXml(child);
        }
    }
}
function generate() {
    var eles = { edges: [], nodes: [] };
    const root = "D:/XMLExtractor";
    const options = {
        absolute: true,
        cwd: root
    };
    var packages = (0, glob_1.globStream)("**/*.xml", options);
    var xmlOptions = {
        recycleNodes: true
    };
    const seenTuningIDs = new Map();
    packages.on('data', (file) => {
        const buffer = fs.readFileSync(file.toString());
        const res = xml_dom_1.XmlDocumentNode.fromRecycled(buffer, xmlOptions);
        if (typeof xmlOptions.recycledNodesCache === "undefined") {
            xmlOptions.recycledNodesCache = res.recyclingCache;
        }
        var xml = res.doc.child;
        const attr = enums_1.TuningResourceType.parseAttr(xml.attributes.i);
        if (enums_1.TuningResourceType.getAttr(attr) != xml.attributes.i) {
            // console.log("skipping", file, "since", xml.attributes.i, "!=", TuningResourceType.getAttr(attr));
            return;
        }
        if (seenTuningIDs.has(xml.id.toString())) {
            console.log(file, "is a duplicate of", seenTuningIDs.get(xml.id.toString()), "?");
            return;
        }
        seenTuningIDs.set(xml.id.toString(), file.toString());
        var node = {
            data: {
                id: xml.id.toString(),
                Name: xml.name,
                File: file.toString(),
            }
        };
        for (const [key, value] of Object.entries(xml.attributes)) {
            switch (key) {
                case 'c':
                    node.data.Class = value;
                    break;
                case 'i':
                    node.data.Instance = value;
                    break;
                case 'm':
                    node.data.Module = value;
                    break;
            }
        }
        eles.nodes.push(node);
        const seen = new Set();
        for (const ref of scanXml(xml)) {
            if (seen.has(ref))
                continue;
            const edge = {
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
//# sourceMappingURL=generate.js.map