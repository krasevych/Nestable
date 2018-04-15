import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import pure from 'recompose/pure';

import CustomDragLayer from './DragLayer';
import Container from './Container';

function createSpliceCommand(position, options = {}) {
  const command = {};
  const itemsToInsert = options.itemsToInsert || [];
  const lastIndex = position.length - 1;
  let currCommand = command;

  position.forEach((index, i) => {
    if (i === lastIndex) {
      currCommand.$splice = [[index, options.numToRemove, ...itemsToInsert]];
    } else {
      const nextCommand = {};
      currCommand[index] = { children: nextCommand };
      currCommand = nextCommand;
    }
  });

  return command;
}

function replaceNegativeIndex(items, nextPosition) {
  let currItems = items;

  return nextPosition.map(nextIndex => {
    if (nextIndex !== -1) {
      currItems = currItems[nextIndex].children || [];
      return nextIndex;
    }

    return currItems.length;
  });
}

function getRealNextPosition(prev, next) {
  // moving up a level
  if (prev.length < next.length) {
    return next.map((nextIndex, i) => {
      if (typeof prev[i] !== 'number') {
        return nextIndex;
      }

      return nextIndex > prev[i] ? nextIndex - 1 : nextIndex;
    });
  }

  return next;
}

const createChildrenFromOrder = (items, orderPropName) => {
  const itemsWithChildren = [];

  items.forEach(item => {
    const orderArr = item[orderPropName].split('.');
    let currentDeepLevel = itemsWithChildren;

    orderArr.forEach((order, index) => {
      const itemPosition = order - 1;
      if (!currentDeepLevel[itemPosition]) {
        currentDeepLevel[itemPosition] = { children: [] };
      }
      if (index + 1 === orderArr.length) {
        currentDeepLevel[itemPosition] = {
          ...currentDeepLevel[itemPosition],
          ...item
        };
      }
      currentDeepLevel = currentDeepLevel[itemPosition].children;
    });
  });

  return itemsWithChildren;
};

class Nestable extends Component {
  static defaultProps = {
    items: [],
    childrenProperty: 'order',
    childrenStyle: {},
    onChange: () => {},
    renderItem: () => {
      throw new Error('Nestable: You must supply a renderItem prop.');
    },
    useDragHandle: false,
    maxDepth: 3,
    threshold: 30
  };

  static childContextTypes = {
    useDragHandle: PropTypes.bool.isRequired,
    maxDepth: PropTypes.number.isRequired,
    threshold: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired,
    dropItem: PropTypes.func.isRequired
  };

  state = {};

  static getDerivedStateFromProps({ items, childrenProperty }, prevState) {
    if (items !== prevState.items) {
      return {
        items: createChildrenFromOrder(items, childrenProperty)
        // items: nextProps.items
      };
    }
  }

  getChildContext() {
    const { useDragHandle, maxDepth, threshold, renderItem } = this.props;

    return {
      useDragHandle,
      maxDepth,
      threshold,
      renderItem,
      moveItem: this.moveItem,
      dropItem: this.dropItem
    };
  }
  moveItem = ({ dragItem, prevPosition, nextPosition }) => {
    let newItems = this.state.items;

    // the remove action might affect the next position,
    // so update next coordinates accordingly
    let realNextPosition = getRealNextPosition(prevPosition, nextPosition);

    if (realNextPosition[realNextPosition.length - 1] === -1) {
      realNextPosition = replaceNegativeIndex(newItems, realNextPosition);
    }

    // remove item from old position
    const removeItem = createSpliceCommand(prevPosition, {
      numToRemove: 1
    });

    // add item to new position
    const insertItem = createSpliceCommand(realNextPosition, {
      numToRemove: 0,
      itemsToInsert: [dragItem]
    });

    newItems = update(newItems, removeItem);
    newItems = update(newItems, insertItem);

    this.setState({ items: newItems });

    return Promise.resolve(realNextPosition);
  };

  dropItem = droppedItem => {
    this.props.onChange(droppedItem, this.state.items);
  };

  render() {
    const { items } = this.state;
    const { renderItem, childrenStyle } = this.props;

    return (
      <div>
        <Container
          items={items}
          parentPosition={[]}
          childrenStyle={childrenStyle}
          topLevel={true}
        />
        <CustomDragLayer
          renderItem={renderItem}
          childrenStyle={childrenStyle}
        />
      </div>
    );
  }
}

export default pure(Nestable);
