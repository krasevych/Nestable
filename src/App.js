import React, { Component } from 'react';

import './App.css';
import Nestable from './components/Nestable/Nestable';
import NestableStyled from './components/NestableStyled/NestableStyled';
import { withDragDropContext } from './HOCs/withDragDropContext';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const DropZone = () => {
  return <div className="ws-drop-zone">Drop Page Here</div>;
};
const PageItem = ({ nestable, item }) => {
  const draggingClass = nestable.isDragging ? ' is-dragging' : '';
  const allowedClass = nestable.isDropAllowed ? ' is-allowed' : '';
  return (
    <div className={'ws-page-manager-item' + draggingClass + allowedClass}>
      {nestable.hasChildren && (
        <div className="ws-page-manage-item-toggle" onClick={nestable.toggle}>
          {nestable.isCollapsed ? '+' : '-'}
        </div>
      )}

      <a href={item.href}>{item.name}</a>
    </div>
  );
};

class Demo extends Component {
  state = {
    items: [
      {
        id: 'uuid-1',
        name: 'Page 1',
        href: 'http://link.to/page-1',
        order: '1'
      },
      {
        id: 'uuid-2',
        name: 'Page 2',
        href: 'http://link.to/page-2',
        order: '2'
      },
      {
        id: 'uuid-3',
        name: 'Page 3',
        href: 'http://link.to/page-3',
        order: '3'
      },
      {
        id: 'uuid-3.1',
        name: 'Page 3.1',
        href: 'http://link.to/page-4',
        order: '3.1'
      },
      {
        id: 'uuid-3.2',
        name: 'Page 3.2',
        href: 'http://link.to/page-4',
        order: '3.2'
      },
      {
        id: 'uuid-3.1.1',
        name: 'Page 3.1.1',
        href: 'http://link.to/page-4',
        order: '3.1.1'
      },
      {
        id: 'uuid-4',
        name: 'Page 4',
        href: 'http://link.to/page-5',
        order: '4'
      },
      {
        id: 'uuid-5',
        name: 'Page 5',
        href: 'http://link.to/page-5',
        order: '5'
      },
      {
        id: 'uuid-6',
        name: 'Page 6',
        href: 'http://link.to/page-5',
        order: '6'
      },
      {
        id: 'uuid-7',
        name: 'Page 7',
        href: 'http://link.to/page-5',
        order: '7'
      }
    ]
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
    return (
      <div className="nestable-demo-container">
        <NestableStyled
          items={this.state.items}
          collapsed={['uuid-3']}
          onChange={(item, items) => console.log(item, items)}
        />
      </div>
    );
  }
}

export default Demo;
// export default DragDropContext(HTML5Backend)(Demo);
