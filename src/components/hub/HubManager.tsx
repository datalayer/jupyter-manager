import { compose } from 'react-recompose';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HubDashboard from './views/HubDashboard';
import Groups from './views/group/Groups';
import GroupEdit from './views/group/GroupEdit';
import UserAdd from './views/user/UserAdd';
import UserEdit from './views/user/UserEdit';
import withAPI from '../../api/withAPI';

import './../../../style/jupyterhub/root.css';

const HubDashboardCompose = compose(withAPI)(HubDashboard);
const UserAddCompose = compose(withAPI)(UserAdd);
const UserEditCompose = compose(withAPI)(UserEdit);

const HubManager = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HubDashboardCompose />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:name" element={<GroupEdit />} />
        <Route path="/add-users" element={<UserAddCompose />} />
        <Route path="/users/:name" element={<UserEditCompose />} />
        {/*<Route path="/*" element={<NotFound />} />*/}
      </Routes>
    </Router>
  );
};

export default HubManager;
