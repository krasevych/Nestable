import React, { Component } from 'react';

import './NestableStyled.css';
import Nestable from '../Nestable/Nestable';
import { withDragDropContext } from '../../HOCs/withDragDropContext';

const DropZone = () => {
  return <div className="ws-drop-zone">Drop Page Here</div>;
};
const PageItem = ({ nestable, item }) => {
  const draggingClass = nestable.isDragging ? ' is-dragging' : '';
  const allowedClass = nestable.isDropAllowed ? ' is-allowed' : '';
  return (
    <div className={'ws-manager-item' + draggingClass + allowedClass}>
      {nestable.hasChildren && (
        <div className="ws-manager-item-toggle" onClick={nestable.toggle}>
          {nestable.isCollapsed ? '+' : '-'}
        </div>
      )}

      <a href={item.href}>{item.name}</a>
    </div>
  );
};

class NestableStyled extends Component {
  static defaultProps = {
    items: [],
    collapsed: [],
    onChange: () => {},
    renderItem: null,
    customDragHandler: false,
    maxDepth: 3,
    threshold: 30
  };

  renderItem = (item, nestable) => {
    return (
      <div className="container">
        {nestable.isDropLayer ? (
          <DropZone />
        ) : (
          <PageItem nestable={nestable} item={item} />
        )}
      </div>
    );
  };

  render() {
    const { renderItem: customRenderItem, ...rest } = this.props;
    return (
      <div className="ws-nestable-styled">
        <Nestable {...rest} renderItem={customRenderItem || this.renderItem} />
      </div>
    );
  }
}

export default withDragDropContext(NestableStyled);
