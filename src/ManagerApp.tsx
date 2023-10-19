/// <reference types="webpack-env" />

import { createRoot } from 'react-dom/client';
import ManagerJupyterLabHeadless from './ManagerJupyterLabHeadless';

import "./../style/index.css";

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div)

if (module.hot) {
  module.hot.accept('./ManagerJupyterLabHeadless', () => {
    const ManagerJupyterLabHeadless = require('./ManagerJupyterLabHeadless').default;
    root.render(<ManagerJupyterLabHeadless/>);
  })
}

root.render(<ManagerJupyterLabHeadless />);
