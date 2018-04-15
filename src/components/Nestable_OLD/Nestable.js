import React from 'react';
import { DragSource } from 'react-dnd';
import nestableTypes from './nestableTypes';

const cardSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { id: props.id };
    console.log(555, item);

    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log(555, item, dropResult);
  }
};

class Card extends React.Component {
  render() {
    // Your component receives its own props as usual
    const { id } = this.props;

    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        I am a draggable card number {id}
        {isDragging && ' (and I am being dragged now)'}
      </div>
    );
  }
}

export default DragSource(
  nestableTypes.nestedItem,
  cardSource,
  (connect, monitor) => ({
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  })
)(Card);
