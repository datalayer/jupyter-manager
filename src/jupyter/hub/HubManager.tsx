import { compose } from 'react-recompose';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import withAPI from './utils/withAPI';
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
    <Router>
      <Routes>
        <Route path="/" element={<HubDashboardCompose />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:name" element={<GroupEditCompose />} />
        <Route path="/users-add" element={<UserAddCompose />} />
        <Route path="/user-edit" element={<UserEditCompose />} />
        {/*<Route path="/*" element={<NotFound />} />*/}
      </Routes>
    </Router>
  );
};

export default HubManager;
