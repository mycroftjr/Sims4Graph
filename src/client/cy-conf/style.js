import { TuningResourceType } from "@s4tk/models/enums";

var style = `
core {
	active-bg-color: #fff;
	active-bg-opacity: 0.333;
}

.faded {
	events: no;
}

edge {
	curve-style: haystack;
	haystack-radius: 0;
	opacity: 0.333;
	width: 2;
	z-index: 0;
	overlay-opacity: 0;
	events: no;
	line-color: #DE3128;
}

edge.highlighted {
	opacity: 0.8;
	width: 4;
	z-index: 9999;
}

edge.faded {
	opacity: 0.06;
}

node {
	width: 40;
	height: 40;
	font-size: 9;
	font-weight: bold;
	min-zoomed-font-size: 4;
	label: data(name);
	text-wrap: wrap;
	text-max-width: 50;
	text-valign: center;
	text-halign: center;
	text-events: yes;
	color: #000;
	text-outline-width: 1;
	text-outline-color: #fff;
	text-outline-opacity: 1;
	overlay-color: #fff;
}

node.highlighted {
	min-zoomed-font-size: 0;
	z-index: 9999;
}

node.faded {
	opacity: 0.08;
}

.hidden {
	display: none;
}

`;
export default style;

TuningResourceType.all().forEach((trt) => {
    const color = trt.toString(16).toUpperCase().slice(0, 6);
    style +=
`node[Instance = "${TuningResourceType.getAttr(trt)}"] {
    background-color: #${color};
    text-outline-color: #${color};
}

`;
});
