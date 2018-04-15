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

class Container extends Component {
  render() {
    const { items, parentPosition, childrenStyle, topLevel } = this.props;

    return (
      <ol style={topLevel ? {} : childrenStyle}>
        {items.map((item, i) => {
          const position = parentPosition.concat([i]);
          const children = item.children;
          return (
            <Item
              id={item.id}
              key={item.id}
              item={item}
              index={i}
              siblings={items}
              position={position}
              depth={getDepth(item)}
            >
              {children && children.length ? (
                <WrappedContainer
                  items={children}
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
