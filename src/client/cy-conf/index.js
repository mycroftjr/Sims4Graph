import style from './style';

function wrap(d) {
    return { data: d };
}

const elements = import("./elements.json").then(
    /**
     * @typedef {{Class?: string, Instance?: string, Module?: string, name: string, id: string, Group?: string}} Node
     * @typedef {{source: string, target: string}} Edge
     * @typedef {{edges: Edge[], nodes: Node[]}} Elements
     * @param {Object} obj
     * @param {Elements} obj.default
     */
    ({ default: e }) => {
        e.nodes = e.nodes.map(wrap);
        e.edges = e.edges.map(wrap);
        return e;
    }
);

export { style, elements };
export default { style, elements };
