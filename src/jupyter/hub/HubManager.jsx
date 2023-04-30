import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { compose } from "recompose";
import { initialState, reducers } from "./Store";
import withAPI from "./util/withAPI";
import { HashRouter, Routes, Route } from "react-router-dom";
import ServerDashboard from "./components/ServerDashboard/ServerDashboard";
import Groups from "./components/Groups/Groups";
import GroupEdit from "./components/GroupEdit/GroupEdit";
import CreateGroup from "./components/CreateGroup/CreateGroup";
import AddUser from "./components/AddUser/AddUser";
import EditUser from "./components/EditUser/EditUser";

import "bootstrap/dist/css/bootstrap.min.css";

import "./../../../style/jupyterhub/root.css";

const store = createStore(reducers, initialState);

const ServerDashboardCompose = compose(withAPI)(ServerDashboard);
const GroupsCompose = compose(withAPI)(Groups);
const GroupEditCompose = compose(withAPI)(GroupEdit);
const CreateGroupCompose = compose(withAPI)(CreateGroup);
const AddUserCompose = compose(withAPI)(AddUser);
const EditUserCompose = compose(withAPI)(EditUser);

const HubManager = () => {
  return (
    <div>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={<ServerDashboardCompose/>}
            />
            <Route 
              exact 
              path="/groups" 
              element={<GroupsCompose/>} />
            <Route
              exact
              path="/group-edit"
              element={<GroupEditCompose/>}
            />
            <Route
              exact
              path="/create-group"
              element={<CreateGroupCompose/>}
            />
            <Route
              exact
              path="/add-users"
              element={<AddUserCompose/>}
            />
            <Route
              exact
              path="/edit-user"
              element={<EditUserCompose/>}
            />
          </Routes>
        </HashRouter>
      </Provider>
    </div>
  );
};

export default HubManager;
