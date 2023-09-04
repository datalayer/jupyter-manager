import { Box } from '@primer/react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import {
  GearIcon,
  EyeIcon,
  CpuIcon,
  AppsIcon,
  InfoIcon
} from '@primer/octicons-react';
import {
  DatalayerGreenIcon,
  JupyterHubIcon,
  JupyterContentIcon,
  JupyterServerIcon,
  JupyterKernelIcon,
} from '@datalayer/icons-react';
import { UnderlineNav } from '@primer/react';

function UnderlineNavItem({ to, children, ...rest }: any) {
  const resolved = useResolvedPath(to);
  const isCurrent = useMatch({ path: resolved.pathname, end: true });
  return (
    <UnderlineNav.Item
      as={Link}
      to={to}
      aria-current={isCurrent ? 'page' : undefined}
      {...rest}
    >
      {children}
    </UnderlineNav.Item>
  );
}
const Navbar = (): JSX.Element => {
  return (
    <Box>
      <Box mb={1}>
        <UnderlineNav aria-label="jupyter-manager">
          <UnderlineNavItem to="/" icon={() => <DatalayerGreenIcon colored />} aria-label="jupyter-manager-home">
            Home
          </UnderlineNavItem>
          <UnderlineNavItem to="/hub" icon={() => <JupyterHubIcon />} aria-label="jupyter-manager-hub">
            Hub
          </UnderlineNavItem>
          <UnderlineNavItem to="/servers" icon={() => <JupyterServerIcon />} aria-label="jupyter-manager-servers">
            Servers
          </UnderlineNavItem>
          <UnderlineNavItem to="/kernels" icon={() => <JupyterKernelIcon />} aria-label="jupyter-manager-kernels">
            Kernels
          </UnderlineNavItem>
          <UnderlineNavItem to="/content" icon={() => <JupyterContentIcon />} aria-label="jupyter-manager-content">
            Content
          </UnderlineNavItem>
          <UnderlineNavItem to="/apps" icon={AppsIcon} aria-label="jupyter-manager-apps">
            Applications
          </UnderlineNavItem>
          <UnderlineNavItem to="/nodes" icon={CpuIcon} aria-label="jupyter-manager-nodes">
            Nodes
          </UnderlineNavItem>
          <UnderlineNavItem to="/events" icon={EyeIcon} aria-label="jupyter-manager-events">
            Events
          </UnderlineNavItem>
          <UnderlineNavItem to="/settings" icon={GearIcon} aria-label="jupyter-manager-settings">
            Settings
          </UnderlineNavItem>
          <UnderlineNavItem to="/about" icon={InfoIcon} aria-label="jupyter-manager-about">
            About
          </UnderlineNavItem>
        </UnderlineNav>
      </Box>
    </Box>
  );
};

export default Navbar;
