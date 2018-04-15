import React, { Component } from 'react';

let collapseStyle = {
  overflow: 'hidden',
  transition: 'all .3s'
};

class Collapse extends Component {
  wrapper = React.createRef();
  state = {
    height: 0,
    isFirstRender: true
  };

  getWrapperStyle = () => {
    if (this.state.isFirstRender) {
      return { height: 'auto' };
    }

    if (!this.props.isOpenned) {
      return { height: 0 };
    }

    return { height: Math.max(0, this.state.height) };
  };

  componentDidMount() {
    const height = this.wrapper.current.clientHeight;
    this.setState({ height, isFirstRender: false });
  }
  render() {
    const { children } = this.props;
    return (
      <div
        ref={this.wrapper}
        style={{ ...this.getWrapperStyle(), ...collapseStyle }}
      >
        {children}
      </div>
    );
  }
}

export default Collapse;
