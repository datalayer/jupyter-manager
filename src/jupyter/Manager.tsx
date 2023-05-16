import { useEffect, useState } from 'react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { ThemeProvider, BaseStyles, Box } from '@primer/react';
import {
  GearIcon,
  CpuIcon,
  EyeIcon,
  FileDirectoryIcon
} from '@primer/octicons-react';
import {
  DatalayerGreenIcon,
  JupyterHubIcon,
  JupyterServerIcon,
  JupyterKernelIcon
} from '@datalayer-icons/react/solid';
import { UnderlineNav } from '@primer/react/drafts';
import store from './Store';
import { loadDatalayerConfig, loadJupyterConfig, getHubPrefix } from './Config';
import { requestAPI } from './api/handler';
import HubManager from './hub/HubManager';
import ServerManager from './server/ServerManager';
import EditorManager from './editor/EditorManager';
import KernelsManager from './kernels/KernelsManager';
import VolumesManager from './volumes/VolumesManager';
import EventsManager from './events/EventsManager';
import SettingsManager from './settings/SettingsManager';
import AboutManager from './about/AboutManager';

type ManagerProps = {
  loadDatalayerConfigFromPage: boolean;
};

const ConfigUpdater = (props: { data: any }) => {
  const { data } = props;
  const dispatch = useDispatch();
  const updateConfigs = (data: any) => {
    dispatch({
      type: 'UPDATE_CONFIG',
      value: {
        config: data.config
      }
    });
    dispatch({
      type: 'SET_CONFIG_SCHEMA',
      value: {
        config_schema: data.config_schema
      }
    });
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
    requestAPI<any>('get_config')
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
            <Box mb={3}>
              <UnderlineNav>
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
                  icon={CpuIcon}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('editor');
                  }}
                >
                  Editor
                </UnderlineNav.Item>
                <UnderlineNav.Item
                  icon={() => <JupyterServerIcon colored />}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('server');
                  }}
                >
                  Server
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
                  icon={JupyterKernelIcon}
                  onSelect={e => {
                    e.preventDefault();
                    setTab('kernels');
                  }}
                >
                  Kernels
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
            <Box pt={1} pb={1} pl={5} pr={5}>
              {tab === 'hub' && showHub && <HubManager />}
              {tab === 'editor' && <EditorManager />}
              {tab === 'server' && <ServerManager />}
              {tab === 'volumes' && <VolumesManager />}
              {tab === 'kernels' && <KernelsManager />}
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
