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

function calcCollapsedList(collapsedList, items) {
  const isArr = collapsedList.push;
  if (isArr) {
    return collapsedList;
  }

  if (collapsedList === 'all') {
    return items.map(item => item.id);
  }

  return [];
}

class Container extends Component {
  state = {
    collapsedList: []
  };

  static getDerivedStateFromProps({ collapsed, items }, prevState) {
    return {
      collapsedList: calcCollapsedList(collapsed, items)
    };
  }

  handleCollapseChange = (isCollapsed, item) => {
    this.setState(({ collapsedList }) => {
      let newCollapsedList = collapsedList;

      if (isCollapsed) {
        newCollapsedList.push(item.id);
      } else {
        newCollapsedList = collapsedList.filter(
          collapsedId => collapsedId !== item.id
        );
      }

      return {
        collapsedList: newCollapsedList
      };
    });
  };

  render() {
    const {
      items,
      parentPosition,
      childrenStyle,
      topLevel,
      collapsed
    } = this.props;

    const { collapsedList } = this.state;

    return (
      <ol className={topLevel && 'is-top-level'}>
        {items.map((item, i) => {
          const position = parentPosition.concat([i]);
          const children = item.children;
          const isCollapsed = collapsedList.includes(item.id);

          return (
            <Item
              id={item.id}
              key={item.id}
              item={item}
              index={i}
              isFirst={i === 0}
              isLast={i === items.length - 1}
              siblings={items}
              position={position}
              isCollapsed={isCollapsed}
              onCollapseChange={this.handleCollapseChange}
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
