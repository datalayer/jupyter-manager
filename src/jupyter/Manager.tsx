import { useEffect, useState} from 'react';
import { ThemeProvider, BaseStyles, Box } from '@primer/react';
import { GearIcon, CpuIcon, AppsIcon, EyeIcon, ServerIcon, FileDirectoryIcon, TableIcon } from '@primer/octicons-react';
import { UnderlineNav } from '@primer/react/drafts';
import { loadDatalayerConfig, loadJupyterConfig, getHubPrefix } from './Config';
import { requestAPI } from './api/handler';
import HubManager from './hub/HubManager';
import ServerManager from './server/ServerManager';
import EditorManager from './editor/EditorManager';
import KernelsManager from './kernels/KernelsManager';
import VolumesManager from './volumes/VolumesManager';
import EventsManager from './events/EventsManager';
import SettingsManager from './settings/SettingsManager';

type ManagerProps = {
  loadDatalayerConfigFromPage: boolean,
}

const Manager = (props: ManagerProps): JSX.Element => {
  const { loadDatalayerConfigFromPage: loadDatalayerConfigFromPage } = props;
  const [tab, setTab] = useState('hub');
  const [showHub, setShowHub] = useState(false);
  useEffect(() => {
    if (loadDatalayerConfigFromPage) {
      loadDatalayerConfig({});
    }
    loadJupyterConfig();
    setShowHub(getHubPrefix() !== '');
    requestAPI<any>('get_config')
      .then(data => {
        console.log('get_config', data);
      })
      .catch(reason => {
        console.error(
          `The jupyter server extension appears to be missing.\n${reason}`
        );
      });
  });
  return (
    <>
      <ThemeProvider>
        <BaseStyles>
          <Box>
            <Box mb={3}>
              <UnderlineNav>
                <UnderlineNav.Item aria-current="page" icon={AppsIcon} onSelect={e => {e.preventDefault(); setTab('hub');}}>
                  Hub
                </UnderlineNav.Item>
                <UnderlineNav.Item icon={CpuIcon} onSelect={e => {e.preventDefault(); setTab('editor');}}>
                  Editor
                </UnderlineNav.Item>
                <UnderlineNav.Item icon={ServerIcon} onSelect={e => {e.preventDefault(); setTab('server');}}>
                  Server
                </UnderlineNav.Item>
                <UnderlineNav.Item icon={FileDirectoryIcon} onSelect={e => {e.preventDefault(); setTab('volumes');}}>
                  Volumes
                </UnderlineNav.Item>
                <UnderlineNav.Item icon={TableIcon} onSelect={e => {e.preventDefault(); setTab('kernels');}}>
                  Kernels
                </UnderlineNav.Item>
                <UnderlineNav.Item icon={EyeIcon} onSelect={e => {e.preventDefault(); setTab('events');}}>
                  Events
                </UnderlineNav.Item>
                <UnderlineNav.Item icon={GearIcon} onSelect={e => {e.preventDefault(); setTab('settings');}}>
                  Settings
                </UnderlineNav.Item>
              </UnderlineNav>
            </Box>
            <Box>
              {(tab === 'hub') && showHub && <HubManager/>}
              {(tab === 'editor') && <EditorManager/>}
              {(tab === 'server') && <ServerManager/>}
              {(tab === 'volumes') && <VolumesManager/>}
              {(tab === 'kernels') && <KernelsManager/>}
              {(tab === 'events') && <EventsManager/>}
              {(tab === 'settings') && <SettingsManager/>}
            </Box>
          </Box>
        </BaseStyles>
      </ThemeProvider>
    </>
  )
};

Manager.defaultProps = {
  loadDatalayerConfigFromPage: true,
} as Partial<ManagerProps>;

export default Manager;
