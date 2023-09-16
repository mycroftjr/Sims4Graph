import { h, Component } from 'preact';
import { TuningResourceType } from "@s4tk/models/enums";
import { _16To10 } from "simple-base-converter";

class NodeInfo extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { node } = this.props;
    const data = node.data();

    var folder = data.Instance;
    if (data.Instance == undefined || data.Instance == "Tuning") {
      folder = "tun";
    }
    const T = TuningResourceType.parseAttr(data.Instance).toString(16).padStart(8, '0');
    const G = (data.Group ?? "0").toLowerCase().padStart(8, '0');
    const I = data.id.padStart(16, '0');
    const TGI = `${T}!${G}!${I}`.toLowerCase();
    const file = `${TGI}.${data.name}.${data.Instance}.xml`;
    const fpath = ['D:', 'XMLExtractor', data.Pack, folder, file].join('/');

    return h('div', { class: 'node-info' }, [
      h('div', { class: 'node-info-id' }, _16To10(data.id)),
      h('div', { class: 'node-info-name' }, data.name),
      h('div', { class: 'node-info-instance' }, data.Instance),
      h('div', { class: 'node-info-more' }, [
        h('a', { target: '_blank', href: fpath }, 'View tuning')
      ])
    ]);
  }
}

export default NodeInfo;
export { NodeInfo };
