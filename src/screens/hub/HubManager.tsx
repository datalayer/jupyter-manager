import { Routes, Route } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import HubSidebar from '../../components/HubSidebar';
import Overview from './views/overview/Overview';
import Groups from './views/group/Groups';
import GroupEdit from './views/group/GroupEdit';
import Users from './views/user/Users';
import UserEdit from './views/user/UserEdit';
import Servers from './views/server/Servers';
import { Box, PageLayout } from '@primer/react';

const HubManager = (): JSX.Element => {
  return (
    <>
      <Box display="flex" sx={{ minHeight: '100vh' }}>
        <HubSidebar />
        <PageLayout sx={{ width: '100%' }}>
          <PageLayout.Header divider="line">
            <Breadcrumbs />
          </PageLayout.Header>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/:name" element={<GroupEdit />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:name" element={<UserEdit />} />
            <Route path="/servers" element={<Servers />} />
            {/*<Route path="/*" element={<NotFound />} />*/}
          </Routes>
          {/* <PageLayout.Footer></PageLayout.Footer> */}
        </PageLayout>
      </Box>
    </>
  );
};

export default HubManager;
