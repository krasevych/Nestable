import { DragDropContext } from 'react-dnd';
import throttle from 'react-throttle-render';
import MultiBackend from 'react-dnd-multi-backend';
import MouseBackend from 'react-dnd-mouse-backend';
import TouchBackend from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';

const HTML5toTouch = {
  backends: [
    {
      backend: MouseBackend
    },
    {
      backend: TouchBackend({ enableMouseEvents: true }), // Note that you can call your backends with options
      preview: true
    }
  ]
};

export const withDragDropContext = Component =>
  DragDropContext(MultiBackend(HTML5toTouch))(Component);
