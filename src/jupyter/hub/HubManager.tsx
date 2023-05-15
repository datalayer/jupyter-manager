import { compose } from 'react-recompose';
import { HashRouter, Routes, Route } from 'react-router-dom';
import withAPI from './util/withAPI';
import HubDashboard from './components/HubDashboard';
import Groups from './components/group/Groups';
import GroupEdit from './components/group/GroupEdit';
import UserAdd from './components/user/UserAdd';
import UserEdit from './components/user/UserEdit';

import './../../../style/jupyterhub/root.css';

const HubDashboardCompose = compose(withAPI)(HubDashboard);
const GroupsCompose = compose(withAPI)(Groups);
const GroupEditCompose = compose(withAPI)(GroupEdit);
const UserAddCompose = compose(withAPI)(UserAdd);
const UserEditCompose = compose(withAPI)(UserEdit);

const HubManager = (): JSX.Element => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HubDashboardCompose />} />
        <Route path="/groups" element={<GroupsCompose />} />
        <Route path="/group-edit" element={<GroupEditCompose />} />
        <Route path="/users-add" element={<UserAddCompose />} />
        <Route path="/user-edit" element={<UserEditCompose />} />
      </Routes>
    </HashRouter>
  );
}

export default HubManager;
