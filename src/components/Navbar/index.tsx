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
} from '@datalayer/icons-react/default';
import { UnderlineNav } from '@primer/react/drafts';

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
        <UnderlineNav>
          <UnderlineNavItem to="/" icon={() => <DatalayerGreenIcon colored />}>
            Home
          </UnderlineNavItem>
          <UnderlineNavItem to="/hub" icon={() => <JupyterHubIcon />}>
            Hub
          </UnderlineNavItem>
          <UnderlineNavItem
            to="/servers"
            icon={() => <JupyterServerIcon />}
          >
            Servers
          </UnderlineNavItem>
          <UnderlineNavItem
            to="/kernels"
            icon={() => <JupyterKernelIcon />}
          >
            Kernels
          </UnderlineNavItem>
          <UnderlineNavItem to="/content" icon={() => <JupyterContentIcon />}>
            Content
          </UnderlineNavItem>
          <UnderlineNavItem to="/apps" icon={AppsIcon}>
            Applications
          </UnderlineNavItem>
          <UnderlineNavItem to="/nodes" icon={CpuIcon}>
            Nodes
          </UnderlineNavItem>
          <UnderlineNavItem to="/events" icon={EyeIcon}>
            Events
          </UnderlineNavItem>
          <UnderlineNavItem to="/settings" icon={GearIcon}>
            Settings
          </UnderlineNavItem>
          <UnderlineNavItem to="/about" icon={InfoIcon}>
            About
          </UnderlineNavItem>
        </UnderlineNav>
      </Box>
    </Box>
  );
};

export default Navbar;
