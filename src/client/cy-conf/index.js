import style from './style';
import { _16To10 } from "simple-base-converter";
import * as Papa from "papaparse";

function wrap(d) {
    return { data: d };
}

function getWords(str) {
    return str.split(/[\s_]+/);
}

function addWords(wordSet, wordsStr) {
    if (wordsStr) {
        getWords(wordsStr.toLowerCase()).forEach(wordSet.add, wordSet);
    }
}

function cacheNodeWords(node) {
    const data = node.data;
    data.id10 = _16To10(data.id.toLowerCase());
    
    const wordSet = new Set();

    addWords(wordSet, data.id);
    addWords(wordSet, data.id10);
    addWords(wordSet, data.name);
    addWords(wordSet, data.Class);
    addWords(wordSet, data.Instance);
    addWords(wordSet, data.Module);

    data.words = [...wordSet];
    node.data = data;
};

const nodePromise = new Promise((resolve, reject) => {
    Papa.parse(
        "./nodes.csv", {
        download: true,
        header: true,
        delimiter: " ",
        /**
         * @typedef {{Class?: string, Instance?: string, Module?: string, name: string, id: string, Group?: string}} Node
         * @param {{data: Node[]}} results
         */
        complete: (results) => {
            resolve(results.data);
        }
    });
});

const edgePromise = new Promise((resolve, reject) => {
    Papa.parse(
        "./edges.csv", {
        download: true,
        header: false,
        delimiter: " ",
        complete: resolve
    });
});

const elements = Promise.all(nodePromise, edgePromise).then(
    ([nodeResults, edgeResults]) => {
        /**
         * @typedef {{Class?: string, Instance?: string, Module?: string, name: string, id: string, Group?: string}} Node
         * @typedef {{source: string, target: string}} Edge
         * @typedef {{edges: {data: Edge}[], nodes: {data: Node}[]}} Elements
         * @type {Elements}
         */
        let elements = { edges: [], nodes: [] };
        // process the nodes
        for (const node of nodeResults) {
            const n = wrap(node);
            cacheNodeWords(n);
            node.position = { x: 0, y: 0 };
            node.data.orgPos = { x: 0, y: 0 };
            // node.classes = ['hidden'];
            elements.nodes.push(n);
        }
        // process the edges
        for (const [source, ...targets] of edgeResults.data) {
            for (const target of targets) {
                elements.edges.push(
                    wrap({
                        id: source + "->" + target,
                        source,
                        target
                    })
                );
            }
        }

        console.log('elements processed:', e.nodes.length, e.edges.length);
        return elements;
    }
);

export { style, elements };
export default { style, elements };
