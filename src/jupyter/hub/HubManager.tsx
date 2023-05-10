import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import { compose } from 'react-recompose';
import { initialState, reducers } from './Store';
import withAPI from './util/withAPI';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HubDashboard from './components/HubDashboard';
import Groups from './components/group/Groups';
import GroupEdit from './components/group/GroupEdit';
import GroupCreate from './components/group/GroupCreate';
import UserAdd from './components/user/UserAdd';
import UserEdit from './components/user/UserEdit';

import './../../../style/jupyterhub/root.css';

const store = createStore(reducers, initialState);

const HubDashboardCompose = compose(withAPI)(HubDashboard);
const GroupsCompose = compose(withAPI)(Groups);
const GroupEditCompose = compose(withAPI)(GroupEdit);
const GroupCreateCompose = compose(withAPI)(GroupCreate);
const UserAddCompose = compose(withAPI)(UserAdd);
const UserEditCompose = compose(withAPI)(UserEdit);

const HubManager = (): JSX.Element => {
  return (
    <div>
      <ReduxProvider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HubDashboardCompose />} />
            <Route path="/groups" element={<GroupsCompose />} />
            <Route path="/group-edit" element={<GroupEditCompose />} />
            <Route path="/group-create" element={<GroupCreateCompose />} />
            <Route path="/users-add" element={<UserAddCompose />} />
            <Route path="/user-edit" element={<UserEditCompose />} />
          </Routes>
        </HashRouter>
      </ReduxProvider>
    </div>
  );
};

export default HubManager;
