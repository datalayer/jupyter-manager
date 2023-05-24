import { compose } from 'react-recompose';
import { Routes, Route } from 'react-router-dom';
import Overview from './overview/Overview';
import Groups from './group/Groups';
import GroupEdit from './group/GroupEdit';
import UserAdd from './user/UserAdd';
import UserEdit from './user/UserEdit';
import withAPI from '../../../api/withAPI';

import './../../../../style/jupyterhub/root.css';
import './../../../../style/jupyterhub/server-dashboard.css';

const OverviewCompose = compose(withAPI)(Overview);
const UserAddCompose = compose(withAPI)(UserAdd);
const UserEditCompose = compose(withAPI)(UserEdit);

const HomeManager = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<OverviewCompose />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/groups/:name" element={<GroupEdit />} />
      <Route path="/add-users" element={<UserAddCompose />} />
      <Route path="/users/:name" element={<UserEditCompose />} />
      {/*<Route path="/*" element={<NotFound />} />*/}
    </Routes>
  );
};

export default HomeManager;
