"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("@s4tk/models/enums");
function nodeStyles() {
    enums_1.TuningResourceType.all().forEach((trt) => {
        const val = trt.toString(16).toUpperCase();
        // console.log(val);
        console.log(`
node[Instance = "${enums_1.TuningResourceType.getAttr(trt)}"] {
    background-color: #${val.slice(0, 6)};
    text-outline-color: #${val.slice(0, 6)};
}`);
    });
}
nodeStyles();
//# sourceMappingURL=nodeStyles.js.map