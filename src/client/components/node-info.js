import { h, Component } from 'preact';

class NodeInfo extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { node } = this.props;
    const data = node.data();

    return h('div', { class: 'node-info' }, [
      h('div', { class: 'node-info-id' }, data.id),
      h('div', { class: 'node-info-name' }, data.Name),
      h('div', { class: 'node-info-instance' }, data.Instance),
      h('div', { class: 'node-info-more' }, [
        h('a', { target: '_blank', href: data.File }, 'More information')
      ])
    ]);
  }
}

export default NodeInfo;
export { NodeInfo };
