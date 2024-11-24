import { Jupyter, JupyterLabApp } from '@datalayer/jupyter-react';

import * as lightThemeExtension from '@jupyterlab/theme-light-extension';
import * as collaborationExtension from '@jupyter/collaboration-extension';
import * as managerExtension from './jupyterlab/index';

const JupyterLabComponent = () => (
  <JupyterLabApp
    plugins={[
      lightThemeExtension,
      collaborationExtension,
      managerExtension,
    ]}
    position="absolute"
    height="100vh"
  />
)

export const ManagerJupyterLab = () => (
  <Jupyter startDefaultKernel={false} disableCssLoading={true} collaborative={true}>
    <JupyterLabComponent/>
  </Jupyter>
)

export default ManagerJupyterLab;
