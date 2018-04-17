# Nestable

## Usage

```es6
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
    const { renderItem: customRenderItem, ...rest } = this.props;
    return (
      <div className="ws-nestable-styled">
        <Nestable
          items={this.state.items}
          renderItem={renderItem}
          collapsed={['uuid-3']}
          onChange={(item, items) => console.log(item, items)}
        />
      </div>
    );
  }
}

export default withDragDropContext(Demo);
```

## Props

| Name              | Type                                                                                           | Default                       | Description                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| items             | array                                                                                          | []                            | Array of items. Every item must be of shape { id: @uniq, order: /(\d+\.?)+/ }                                               |
| renderItem        | function                                                                                       | ({ item }) => item.toString() | Function for rendering every item. Gets `item` and `nestable` objects as params.                                            |
| maxDepth          | number                                                                                         | 3                             | Maximum nesting level                                                                                                       |
| threshold         | number                                                                                         | 30                            | Amount of pixels which mouse should move horizontally before increasing/decreasing level (nesting) of current element.      |
| collapsed         | one of: `none`, `all`, `[ "id1", "id2", ... "idN"] |`all` | collapse specific items by default |
| onChange          | function                                                                                       |                               | Gets called on list change. Receives 2 params: affected item, updated items array.                                          |
| customDragHandler | boolean                                                                                        | false                         | If true, passed additional `nestable.connectDragSource` function into `renderItem`. Allows to create a custom drag handler. |

## Nestable Object

| Name              | Type     | Default | Description                                                                                              |
| ----------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------- |
| isDragging        | boolean  | false   | True if nestable item is being dragged                                                                   |
| isCollapsed       | boolean  | false   | True if nestable item is in `dragged` state and its possible to drop it in current area                  |
| hasChildren       | boolean  | false   | True if nestable has nested children                                                                     |
| toggle            | function |         | collapse/expand current nestable item. Does nothing if nestable has no children                          |
| collapse          | function |         | collapse current nestable item. Does nothing if nestable has no children                                 |
| expand            | function |         | expand current nestable item. Does nothing if nestable has no children                                   |
| connectDragSource | function |         | use in order to create custom drag handler. Available if `customDragHandler` is passed to `<Nestable />` |
