import * as fs from "fs";
import { Elements } from './generate';

function stringLengthFirstCompare(a: string, b: string) {
	const lengthDiff = a.length - b.length;
	if (lengthDiff) return lengthDiff;
	return a.localeCompare(b);
}

function convertToCSV(elements: Elements) {
	let nodesCSV = 'id name Class Instance Module Pack Group\n';

	elements.nodes.sort((a, b) => {
		return stringLengthFirstCompare(a.id, b.id);
	}).forEach((node) => {
		nodesCSV += `${node.id} ${node.name} ${node.Class ?? ''} ${node.Instance ?? ''} ` +
		`${node.Module ?? ''} ${node.Pack ?? ''} ${node.Group ?? ''}\n`;
	});
	fs.writeFileSync('public/nodes.csv', nodesCSV);

	const edgeMap: Record<string, string[]> = {};
	elements.edges.forEach((edge) => {
		if (edge.source in edgeMap)
			edgeMap[edge.source].push(edge.target);
		else
			edgeMap[edge.source] = [edge.target];
	});

	let edgesCSV = '';
	Object.keys(edgeMap).sort(stringLengthFirstCompare).reduce(
		(obj: Record<string, string[]>, key) => {
			obj[key] = edgeMap[key].sort(stringLengthFirstCompare);
			edgesCSV += `${key} ${obj[key].join(' ')}\n`;
			return obj;
		}, {}
	);
	fs.writeFileSync('public/edges.csv', edgesCSV);

	// const edgesJson = JSON.stringify(ordered);
	// fs.writeFileSync('src/client/cy-conf/edges.json', edgesJson.replaceAll("],", "],\n"));
}

export { convertToCSV };

if (require.main === module) {
	const elements: Elements = JSON.parse(fs.readFileSync('src/client/cy-conf/elements.json', 'utf-8'));
	convertToCSV(elements);
}
