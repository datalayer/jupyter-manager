import { compose } from 'react-recompose';
import { Routes, Route } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Overview from './overview/Overview';
import Groups from './group/Groups';
import GroupEdit from './group/GroupEdit';
import UserAdd from './user/UserAdd';
import UserEdit from './user/UserEdit';
import withAPI from '../../../api/withAPI';
import { PageLayout } from '@primer/react';

import './../../../../style/jupyterhub/root.css';
import './../../../../style/jupyterhub/server-dashboard.css';

const OverviewCompose = compose(withAPI)(Overview);
const UserAddCompose = compose(withAPI)(UserAdd);
const UserEditCompose = compose(withAPI)(UserEdit);

const HomeManager = (): JSX.Element => {
  return (
    <>
      <PageLayout>
        <PageLayout.Header divider="line">
          <Breadcrumbs />
        </PageLayout.Header>
        <Routes>
          <Route path="/" element={<OverviewCompose />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:name" element={<GroupEdit />} />
          <Route path="/users/add" element={<UserAddCompose />} />
          <Route path="/user/:name" element={<UserEditCompose />} />
          {/*<Route path="/*" element={<NotFound />} />*/}
        </Routes>
        {/* <PageLayout.Footer></PageLayout.Footer> */}
      </PageLayout>
    </>
  );
};

export default HomeManager;
