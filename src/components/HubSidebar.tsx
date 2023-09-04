import { NavList } from '@primer/react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function NavItem({ to, children }: any) {
  const resolved = useResolvedPath(to);
  const isCurrent = useMatch({ path: resolved.pathname, end: true });
  return (
    <NavList.Item
      as={Link}
      to={to}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {children}
    </NavList.Item>
  );
}

const HubSidebar = (): JSX.Element => {
  return (
    <NavList
      sx={{
        minWidth: '200px',
        px: 2,
        borderWidth: 0,
        borderRightWidth: 1,
        borderStyle: 'solid',
        borderColor: 'border.default'
      }}
    >
      <NavItem to="/hub">Overview</NavItem>
      <NavList.Group title="Runtime">
        <NavItem to="/hub/servers">Servers</NavItem>
        <NavItem to="/be/decided">Services</NavItem>
        <NavItem to="/be/decided">Proxy</NavItem>
      </NavList.Group>
      <NavList.Group title="IAM">
        <NavItem to="/hub/users">Users</NavItem>
        <NavItem to="/hub/groups">Groups</NavItem>
        <NavList.Item>
          Authorization
          <NavList.SubNav>
            <NavItem to="/be/decided">Permissions</NavItem>
            <NavItem to="/be/decided">Scopes</NavItem>
          </NavList.SubNav>
        </NavList.Item>
      </NavList.Group>
    </NavList>
  );
};

export default HubSidebar;
