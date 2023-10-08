import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Jupyter, JupyterLabApp, JupyterLabAppAdapter } from '@datalayer/jupyter-react';
import Manager from './Manager';

import * as lightThemeExtension from '@jupyterlab/theme-light-extension';
import * as collaborationExtension from '@jupyter/collaboration-extension';
import * as managerExtension from './jupyterlab/index';

const ThemeGlobalStyle = createGlobalStyle<any>`
  body {
    background-color: white !important;
    overflow-y: visible;
  }
`

const JupyterLabHeadless = () => {
  const [jupyterLabAppAdapter, setJupyterLabAppAdapter] = useState<JupyterLabAppAdapter>();
  const onJupyterLab = (jupyterLabAppAdapter: JupyterLabAppAdapter) => {
    setJupyterLabAppAdapter(jupyterLabAppAdapter);
  }
  return (
    <>
      {jupyterLabAppAdapter && <Manager loadDatalayerConfigFromPage={true} adapter={jupyterLabAppAdapter}/>}
      <JupyterLabApp
        extensions={[
          lightThemeExtension,
          collaborationExtension,
          managerExtension,
        ]}
        headless={true}
        onJupyterLab={onJupyterLab}
      />
    </>
  )
}

export const ManagerJupyterLabHeadless = () => (
  <Jupyter startDefaultKernel={false} disableCssLoading={true} collaborative={true}>
    <ThemeGlobalStyle />
    <JupyterLabHeadless/>
  </Jupyter>
)

export default ManagerJupyterLabHeadless;
