import { useEffect, useState } from 'react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { ThemeProvider, BaseStyles, Box } from '@primer/react';
import {
  GearIcon,
  EyeIcon,
  FileDirectoryIcon,
  CpuIcon,
  AppsIcon
} from '@primer/octicons-react';
import {
  DatalayerGreenIcon,
  JupyterHubIcon,
  JupyterServerIcon,
  JupyterKernelIcon,
  JupyterIcon,
} from '@datalayer/icons-react/solid';
import { UnderlineNav } from '@primer/react/drafts';
import store from '../redux/store';
import { loadDatalayerConfig, loadJupyterConfig, getHubPrefix } from '../api/connectionConfigs';
import { requestAPI } from '../api/serverHandler';
import HubManager from './hub/HubManager';
import ServersManager from './servers/ServersManager';
import ContentManager from './content/ContentManager';
import AppsManager from './apps/AppsManager';
import KernelsManager from './kernels/KernelsManager';
import NodesManager from './nodes/NodesManager';
import VolumesManager from './volumes/VolumesManager';
import EventsManager from './events/EventsManager';
import SettingsManager from './settings/SettingsManager';
import AboutManager from './about/AboutManager';
import { setConfigSchema, updateConfig } from '../redux/actions/config';

type ManagerProps = {
  loadDatalayerConfigFromPage: boolean;
};

const ConfigUpdater = (props: { data: any }) => {
  const { data } = props;
  const dispatch = useDispatch();
  const updateConfigs = (data: any) => {
    dispatch(
      updateConfig(data.config)
    );
    dispatch(
      setConfigSchema(data.config_schema)
    );
  };
  useEffect(() => {
    updateConfigs(data);
  }, []);
  return null;
};

const Manager = (props: ManagerProps): JSX.Element => {
  const { loadDatalayerConfigFromPage: loadDatalayerConfigFromPage } = props;
  const [tab, setTab] = useState('hub');
  const [showHub, setShowHub] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    if (loadDatalayerConfigFromPage) {
      loadDatalayerConfig({});
    }
    loadJupyterConfig();
    setShowHub(getHubPrefix() !== '');
    requestAPI<any>('get_server_config')
      .then(data => {
        setData(data);
      })
      .catch(reason => {
        console.error(
          `The Jupyter Server extension appears to be missing.\n${reason}`
        );
      });
  }, []);
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <BaseStyles>
          {data && <ConfigUpdater data={data} />}
          <Box>
            <Box mb={1}>
              <UnderlineNav>
                <DatalayerGreenIcon/>
                <UnderlineNav.Item
                  aria-current="page"
                  icon={() => <JupyterHubIcon colored />}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('hub');
                  }}
                >
                  Hub
                </UnderlineNav.Item>
                <UnderlineNav.Item
                  icon={() => <JupyterServerIcon colored />}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('servers');
                  }}
                >
                  Servers
                </UnderlineNav.Item>
                <UnderlineNav.Item
                  icon={() => <JupyterKernelIcon colored />}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('kernels');
                  }}
                >
                  Kernels
                </UnderlineNav.Item>
                <UnderlineNav.Item
                  icon={() => <JupyterIcon colored />}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('content');
                  }}
                >
                  Content
                </UnderlineNav.Item>
                <UnderlineNav.Item
                  icon={AppsIcon}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('apps');
                  }}
                >
                  Applications
                </UnderlineNav.Item>
                <UnderlineNav.Item
                  icon={CpuIcon}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('nodes');
                  }}
                >
                  Nodes
                </UnderlineNav.Item>
                <UnderlineNav.Item
                  icon={FileDirectoryIcon}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('volumes');
                  }}
                >
                  Volumes
                </UnderlineNav.Item>
                <UnderlineNav.Item
                  icon={EyeIcon}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('events');
                  }}
                >
                  Events
                </UnderlineNav.Item>
                <UnderlineNav.Item
                  icon={GearIcon}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('settings');
                  }}
                >
                  Settings
                </UnderlineNav.Item>
                <UnderlineNav.Item
                  icon={() => <DatalayerGreenIcon colored />}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('about');
                  }}
                >
                  About
                </UnderlineNav.Item>
              </UnderlineNav>
            </Box>
            <Box pt={1} pb={1} pl={1} pr={1}>
              {tab === 'hub' && showHub && <HubManager />}
              {tab === 'servers' && <ServersManager />}
              {tab === 'kernels' && <KernelsManager />}
              {tab === 'content' && <ContentManager />}
              {tab === 'apps' && <AppsManager />}
              {tab === 'nodes' && <NodesManager />}
              {tab === 'volumes' && <VolumesManager />}
              {tab === 'events' && <EventsManager />}
              {tab === 'settings' && <SettingsManager />}
              {tab === 'about' && <AboutManager />}
            </Box>
          </Box>
        </BaseStyles>
      </ThemeProvider>
    </ReduxProvider>
  );
};

Manager.defaultProps = {
  loadDatalayerConfigFromPage: true
} as Partial<ManagerProps>;

export default Manager;
