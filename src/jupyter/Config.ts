import { PageConfig } from '@jupyterlab/coreutils';

/**
 * Definition of the properties that can be passed
 * when creating a Jupyter context.
 */
export type DatalayerProps = {
  jupyterServerHttpUrl?: string;
  jupyterServerWsUrl?: string;
  jupyterToken?: string;
}

export type IJupyterConfig = {
  hubPrefix: string;
}

let jupyterConfig: IJupyterConfig = {
  hubPrefix: '',
}

export const setHubPrefix = (hubPrefix: string) => {
  jupyterConfig.hubPrefix = hubPrefix;
}
 export const getHubPrefix = () => jupyterConfig.hubPrefix;

/**
 * Type of the Jupyter configuration.
 */
export type IDatalayerConfig = {
  jupyterServerHttpUrl: string;
  jupyterServerWsUrl: string;
  jupyterToken: string;
}

/**
 * The default Jupyter configuration.
 */
let datalayerConfig: IDatalayerConfig = {
  jupyterServerHttpUrl: '',
  jupyterServerWsUrl: '',
  jupyterToken: '',
}

/**
 * Setter for jupyterServerHttpUrl.
 */
export const setJupyterServerHttpUrl = (jupyterServerHttpUrl: string) => {
  datalayerConfig.jupyterServerHttpUrl = jupyterServerHttpUrl;
}
/**
 * Getter for jupyterServerHttpUrl.
 */
 export const getJupyterServerHttpUrl = () => datalayerConfig.jupyterServerHttpUrl;

/**
 * Setter for jupyterServerWsUrl.
 */
 export const setJupyterServerWsUrl = (jupyterServerWsUrl: string) => {
  datalayerConfig.jupyterServerWsUrl = jupyterServerWsUrl;
}
/**
 * Getter for jupyterServerWsUrl.
 */
 export const getJupyterServerWsUrl = () => datalayerConfig.jupyterServerWsUrl;

/**
 * Setter for jupyterToken.
 */
 export const setJupyterToken = (jupyterToken: string) => {
  datalayerConfig.jupyterToken = jupyterToken;
}

/**
 * Getter for jupyterToken.
 */
export const getJupyterToken = () => datalayerConfig.jupyterToken;

export const loadJupyterConfig = () => {
  const jupyterHtmlConfig = document.getElementById('jupyter-config-data');
  if (jupyterHtmlConfig) {
    jupyterConfig = JSON.parse(jupyterHtmlConfig.textContent || '') as IJupyterConfig;
  }
  if (jupyterConfig.hubPrefix) {
    setHubPrefix(jupyterConfig.hubPrefix);
  }
}

 /**
 * Method to load the Jupyter configuration from the
 * host HTML page.
 */
export const loadDatalayerConfig = (props: DatalayerProps) => {
  const { jupyterServerHttpUrl, jupyterServerWsUrl, jupyterToken } = props;
  const datalayerHtmlConfig = document.getElementById('datalayer-config-data');
  if (datalayerHtmlConfig) {
    datalayerConfig = JSON.parse(datalayerHtmlConfig.textContent || '') as IDatalayerConfig;
  }
  if (datalayerConfig.jupyterServerHttpUrl) {
    setJupyterServerHttpUrl(datalayerConfig.jupyterServerHttpUrl);
  } else {
    setJupyterServerHttpUrl(jupyterServerHttpUrl || location.protocol + '//' + location.host + "/api/jupyter");
  }
  if (datalayerConfig.jupyterServerWsUrl) {
    setJupyterServerWsUrl(datalayerConfig.jupyterServerWsUrl);
  } else {
    setJupyterServerWsUrl(jupyterServerWsUrl || location.protocol.replace('http', 'ws') + '//' + location.host + "/api/jupyter");
  }
  if (datalayerConfig.jupyterToken) {
    setJupyterToken(datalayerConfig.jupyterToken);
  } else {
    setJupyterToken(jupyterToken || '');
  }
  PageConfig.setOption('baseUrl', getJupyterServerHttpUrl());
  PageConfig.setOption('wsUrl', getJupyterServerWsUrl());
  PageConfig.setOption('token', getJupyterToken());
  PageConfig.setOption('mathjaxUrl', 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js');
  PageConfig.setOption('mathjaxConfig', 'TeX-AMS_CHTML-full,Safe');
  return datalayerConfig;
}
