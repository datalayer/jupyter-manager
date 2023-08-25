import { useEffect, useState } from 'react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { ThemeProvider, BaseStyles } from '@primer/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import {
  loadDatalayerConfig,
  loadJupyterConfig
} from './api/connectionConfigs';
import { requestAPI } from './api/serverHandler';

import Overview from './screens/overview/Overview';
import HubManager from './screens/hub/HubManager';
import ServersManager from './screens/servers/ServersManager';
import ContentManager from './screens/content/ContentManager';
import AppsManager from './screens/apps/AppsManager';
import KernelsManager from './screens/kernels/KernelsManager';
import NodesManager from './screens/nodes/NodesManager';
import VolumesManager from './screens/volumes/VolumesManager';
import EventsManager from './screens/events/EventsManager';
import SettingsManager from './screens/settings/SettingsManager';
import AboutManager from './screens/about/AboutManager';

import Navbar from './components/Navbar';
import Messages from './components/Messages';

import { setConfigSchema, updateConfig } from './redux/actions/config';

type ManagerProps = {
  loadDatalayerConfigFromPage: boolean;
};

const ConfigUpdater = (props: { data: any }) => {
  const { data } = props;
  const dispatch = useDispatch();
  const updateConfigs = (data: any) => {
    dispatch(updateConfig(data.config));
    dispatch(setConfigSchema(data.config_schema));
  };
  useEffect(() => {
    updateConfigs(data);
  }, []);
  return null;
};

const Manager = (props: ManagerProps): JSX.Element => {
  const { loadDatalayerConfigFromPage: loadDatalayerConfigFromPage } = props;
  const [data, setData] = useState();
  useEffect(() => {
    if (loadDatalayerConfigFromPage) {
      loadDatalayerConfig({});
    }
    loadJupyterConfig();
    requestAPI<any>('get_server_config')
      .then(data => {
        setData(data);
      })
      .catch(reason => {
        console.error(
          `Error while accessing the jupyter server extension.\n${reason}`
        );
      });
  }, []);
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <BaseStyles>
          <Router>
            <Navbar />
            {data && <ConfigUpdater data={data} />}
            <Messages />
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/hub/*" element={<HubManager />} />
              <Route path="/servers" element={<ServersManager />} />
              <Route path="/content" element={<ContentManager />} />
              <Route path="/apps" element={<AppsManager />} />
              <Route path="/kernels" element={<KernelsManager />} />
              <Route path="/nodes" element={<NodesManager />} />
              <Route path="/volumes" element={<VolumesManager />} />
              <Route path="/events" element={<EventsManager />} />
              <Route path="/settings" element={<SettingsManager />} />
              <Route path="/about" element={<AboutManager />} />
            </Routes>
          </Router>
        </BaseStyles>
      </ThemeProvider>
    </ReduxProvider>
  );
};

Manager.defaultProps = {
  loadDatalayerConfigFromPage: true
} as Partial<ManagerProps>;

export default Manager;
