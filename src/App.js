import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import Nestable from './components/Nestable/Nestable.jsx';
import { withDragDropContext } from './HOCs/withDragDropContext';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Nestable />
      </div>
    );
  }
}

class Demo extends Component {
  state = {
    items2: [
      { id: 1, name: 'Item #1', children: [] },
      { id: 2, name: 'Item #2', children: [] },
      { id: 3, name: 'Item #3', children: [] },
      {
        id: 4,
        name: 'Item #4',
        children: [{ id: 5, name: 'Item #5', children: [] }]
      }
    ],

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
        id: 'uuid-4',
        name: 'Page 4',
        href: 'http://link.to/page-4',
        order: '3.1'
      },
      {
        id: 'uuid-5',
        name: 'Page 5',
        href: 'http://link.to/page-5',
        order: '4'
      }
    ]
  };

  renderItem = ({ item }, ...arg) => {
    console.log(777, arg);
    return <div style={styles.item}>{item.name}</div>;
  };

  render() {
    return (
      <div>
        <h1>1111</h1>
        <Nestable
          items={this.state.items}
          renderItem={this.renderItem}
          onChange={(item, items) => console.log(item, items)}
          childrenStyle={styles.children}
        />
      </div>
    );
  }
}

var styles = {
  item: {
    marginBottom: 5,
    padding: 10,
    border: '1px solid #000',
    background: '#fff'
  },
  children: {
    marginLeft: 30
  }
};

export default withDragDropContext(Demo);
// export default DragDropContext(HTML5Backend)(Demo);
