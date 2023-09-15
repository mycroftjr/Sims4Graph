import { TuningResourceType } from "@s4tk/models/enums";

function nodeStyles() {
    TuningResourceType.all().forEach((trt) => {
        const val = trt.toString(16).toUpperCase();
        // console.log(val);
        console.log(
`
node[Instance = "${TuningResourceType.getAttr(trt)}"] {
    background-color: #${val.slice(0, 6)};
    text-outline-color: #${val.slice(0, 6)};
}`
        );
    });
}

nodeStyles();