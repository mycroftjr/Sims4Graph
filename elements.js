import fs from "fs";

/**
 * @typedef {{Class?: string, Instance?: string, Module?: string, Name: string, id: string, File: string}} Node
 * @typedef {{from: string, to: string}} Edge
 * @typedef {{edges: Edge[], nodes: Node[]}} Elements
 * @type {Elements}
 */
const elements = JSON.parse(fs.readFileSync("elements.json"));

/*
// process data
elements.nodes.forEach((n) => {
  const data = n.data;

  data.NodeTypeFormatted = data.NodeType;

  // the source data for types isn't formatted well for reading
  if( data.NodeTypeFormatted === 'RedWine' ){
    data.NodeTypeFormatted = 'Red Wine';
  } else if( data.NodeTypeFormatted === 'WhiteWine' ){
    data.NodeTypeFormatted = 'White Wine';
  } else if( data.NodeTypeFormatted === 'CheeseType' ){
    data.NodeTypeFormatted = 'Cheese Type';
  }

  // save original position for use in animated layouts
  n.data.orgPos = {
    x: n.position.x,
    y: n.position.y
  };

  // zero width space after dashes to allow for line breaking
  data.name = data.name.replace(/[-]/g, '-\u200B');
});
*/

export default elements;
