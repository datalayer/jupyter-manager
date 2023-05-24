import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs as Breadcrumb } from '@primer/react';

const names: Record<string, string> = {
  hub: 'JupyterHub',
  users: 'Users',
  groups: 'Groups',
  servers: 'Servers'
};

const Breadcrumbs = (): JSX.Element => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(path => path);
  if (paths[1] === 'user') {
    paths[1] = 'users';
  }

  return (
    <Breadcrumb>
      {paths.map((path, index) => (
        <Breadcrumb.Item
          as={Link}
          to={`/${paths.slice(0, index + 1).join(' / ')}`}
          key={index}
          selected={index === paths.length - 1}
        >
          {path in names ? names[path] : path}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
