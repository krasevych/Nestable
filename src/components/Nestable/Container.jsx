import React, { Component } from 'react';
import pure from 'recompose/pure';

import Item from './Item';

function getDepth(item) {
  // returns depth of item and children
  var depth = 0;

  if (item.children) {
    item.children.forEach(d => {
      var tmpDepth = getDepth(d);

      if (tmpDepth > depth) {
        depth = tmpDepth;
      }
    });
  }

  return depth + 1;
}

function calcCollapse(item, collapsedList) {
  if (!collapsedList) return;

  const isArr = collapsedList.push;
  if (isArr) {
    return collapsedList.includes(item.id);
  }

  return collapsedList === 'all';
}

class Container extends Component {
  render() {
    const {
      items,
      parentPosition,
      childrenStyle,
      topLevel,
      collapsed
    } = this.props;

    return (
      <ol style={topLevel ? {} : childrenStyle}>
        {items.map((item, i) => {
          const position = parentPosition.concat([i]);
          const children = item.children;
          const isCollapsed = calcCollapse(item, collapsed);

          return (
            <Item
              id={item.id}
              key={item.id}
              item={item}
              index={i}
              siblings={items}
              position={position}
              isCollapsed={isCollapsed}
              depth={getDepth(item)}
            >
              {children && children.length ? (
                <WrappedContainer
                  items={children}
                  collapsed={collapsed}
                  parentPosition={position}
                  childrenStyle={childrenStyle}
                />
              ) : null}
            </Item>
          );
        })}
      </ol>
    );
  }
}

var WrappedContainer = pure(Container);

export default WrappedContainer;
