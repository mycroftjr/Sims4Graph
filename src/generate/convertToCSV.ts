import * as fs from "fs";
import { Elements } from './generate';

function convertToCSV() {
	const elements: Elements = JSON.parse(fs.readFileSync('src/client/cy-conf/elements.json', 'utf-8'));

	let nodesCSV = 'id name Class Instance Module Pack Group\n';
	elements.nodes.sort((a, b) => {
		const lengthDiff = a.id.length - b.id.length;
		if (lengthDiff) return lengthDiff;
		return a.id.localeCompare(b.id);
	}).forEach((node) => {
		nodesCSV += `${node.id} ${node.name} ${node.Class ?? ''} ${node.Instance ?? ''} ` +
		`${node.Module ?? ''} ${node.Pack ?? ''} ${node.Group ?? ''}\n`;
	});
	fs.writeFileSync('public/nodes.csv', nodesCSV);

	const edgeMap = new Map<string, string[]>();
	elements.edges.forEach((edge) => {
		if (!edgeMap.has(edge.source))
			edgeMap.set(edge.source, [edge.target]);
		else
			edgeMap.get(edge.source)?.push(edge.target);
	});

	fs.writeFileSync('src/client/cy-conf/edges.json', JSON.stringify(Array.from(edgeMap.entries()).reduce(
		(o: Record<string, string[]>, [key, value]) => {
			o[key] = value;
			return o;
		}, {}
	)));
}

convertToCSV();