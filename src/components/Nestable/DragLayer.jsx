import React, { Component } from 'react';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import { DragLayer } from 'react-dnd';
import itemTypes from './itemTypes';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0
};

function getItemStyles(props, clientRect) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return { display: 'none' };
  }

  const { x, y } = currentOffset;
  const { width, height } = clientRect;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform: transform,
    WebkitTransform: transform,
    width,
    height
  };
}

const noop = patams => patams;

class CustomDragLayer extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isDragging !== nextProps.isDragging) {
      document.getElementsByTagName('html')[0].classList.toggle('dnd-dragging');
    }
  }

  render() {
    const { item, itemType, renderItem, isDragging } = this.props;

    if (!isDragging || itemType !== itemTypes.nestedItem) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props, item.clientRect)}>
          {renderItem(item.data, {
            isDragging: true,
            isPreview: true,
            depth: 1,
            isDropAllowed: itemType !== itemTypes.nestedItem,
            expand: noop,
            collapse: noop,
            hasChildren: item.data.children.length > 0,
            toggle: noop,
            connectDragSource: noop
          })}
        </div>
      </div>
    );
  }
}

export default compose(
  DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  })),
  pure
)(CustomDragLayer);
