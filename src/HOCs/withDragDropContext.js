import { DragDropContext } from 'react-dnd';
import throttle from 'react-throttle-render';
import MultiBackend from 'react-dnd-multi-backend';
import TouchBackend from 'react-dnd-touch-backend';

const HTML5toTouch = {
  backends: [
    {
      backend: TouchBackend({
        enableMouseEvents: true,
        enableTouchEvents: true
      }),
      preview: true
    }
  ]
};

export const withDragDropContext = Component =>
  DragDropContext(MultiBackend(HTML5toTouch))(Component);
