import React, { Component } from 'react';

class Collapse extends Component {
  getWrapperStyle = () => {
    const height = this.props.isOpenned ? 'auto' : 0;
    return { height, overflow: 'hidden' };
  };

  render() {
    const { children } = this.props;
    return <div style={this.getWrapperStyle()}>{children}</div>;
  }
}

export default Collapse;
