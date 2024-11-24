import { PageConfig } from '@jupyterlab/coreutils';

/**
 * Definition of the properties that can be passed
 * when creating a Jupyter context.
 */
export type DatalayerProps = {
  jupyterServerUrl?: string;
  jupyterServerToken?: string;
};

export type IJupyterConfig = {
  hubPrefix: string;
};

let jupyterConfig: IJupyterConfig = {
  hubPrefix: ''
};

export const setHubPrefix = (hubPrefix: string) => {
  jupyterConfig.hubPrefix = hubPrefix;
};
export const getHubPrefix = () => jupyterConfig.hubPrefix;

/**
 * Type of the Jupyter configuration.
 */
export type IDatalayerConfig = {
  jupyterServerUrl: string;
  jupyterServerToken: string;
};

/**
 * The default Jupyter configuration.
 */
let datalayerConfig: IDatalayerConfig = {
  jupyterServerUrl: '',
  jupyterServerToken: ''
};

/**
 * Setter for jupyterServerUrl.
 */
export const setJupyterServerUrl = (jupyterServerUrl: string) => {
  datalayerConfig.jupyterServerUrl = jupyterServerUrl;
};
/**
 * Getter for jupyterServerUrl.
 */
export const getJupyterServerUrl = () =>
  datalayerConfig.jupyterServerUrl;

/**
 * Setter for jupyterServerToken.
 */
export const setJupyterServerToken = (jupyterServerToken: string) => {
  datalayerConfig.jupyterServerToken = jupyterServerToken;
};

/**
 * Getter for jupyterServerToken.
 */
export const getJupyterServerToken = () => datalayerConfig.jupyterServerToken;

export const loadJupyterConfig = () => {
  const jupyterHtmlConfig = document.getElementById('jupyter-config-data');
  if (jupyterHtmlConfig) {
    jupyterConfig = JSON.parse(
      jupyterHtmlConfig.textContent || ''
    ) as IJupyterConfig;
  }
  if (jupyterConfig.hubPrefix) {
    setHubPrefix(jupyterConfig.hubPrefix);
  }
};

/**
 * Method to load the Jupyter configuration from the
 * host HTML page.
 */
export const loadDatalayerConfig = (props: DatalayerProps) => {
  const { jupyterServerUrl, jupyterServerToken } = props;
  const datalayerHtmlConfig = document.getElementById('datalayer-config-data');
  if (datalayerHtmlConfig) {
    datalayerConfig = JSON.parse(
      datalayerHtmlConfig.textContent || ''
    ) as IDatalayerConfig;
  }
  if (datalayerConfig.jupyterServerUrl) {
    setJupyterServerUrl(datalayerConfig.jupyterServerUrl);
  } else {
    setJupyterServerUrl(
      jupyterServerUrl ||
        location.protocol + '//' + location.host + '/api/jupyter'
    );
  }
  if (datalayerConfig.jupyterServerToken) {
    setJupyterServerToken(datalayerConfig.jupyterServerToken);
  } else {
    setJupyterServerToken(jupyterServerToken || '');
  }
  PageConfig.setOption('baseUrl', getJupyterServerUrl());
  PageConfig.setOption('wsUrl', getJupyterServerUrl().replace(/^http/, 'ws'));
  PageConfig.setOption('token', getJupyterServerToken());
  PageConfig.setOption(
    'mathjaxUrl',
    'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js'
  );
  PageConfig.setOption('mathjaxConfig', 'TeX-AMS_CHTML-full,Safe');
  return datalayerConfig;
};
