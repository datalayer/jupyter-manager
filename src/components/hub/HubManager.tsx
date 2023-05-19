import { Box, NavList } from '@primer/react'
import HomeManager from './views/HomeManager';

const HubManager = (): JSX.Element => {
  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Box sx={{minWidth: "200px"}}>
          <NavList>
            <NavList.Item aria-current="page">
              Overview
            </NavList.Item>
            <NavList.Group title="Runtime">
              <NavList.Item>
                Servers
              </NavList.Item>
              <NavList.Item>
                Services
              </NavList.Item>
              <NavList.Item>
                Proxy
              </NavList.Item>
            </NavList.Group>
            <NavList.Group title="IAM">
              <NavList.Item>
                Users
              </NavList.Item>
              <NavList.Item>
                Groups
              </NavList.Item>
              <NavList.Item>
                Authorisation
                <NavList.SubNav>
                  <NavList.Item>
                    Permissions
                  </NavList.Item>
                  <NavList.Item >
                    Scopes
                  </NavList.Item>
                </NavList.SubNav>
              </NavList.Item>
            </NavList.Group>
          </NavList>
        </Box>
        <Box>
          <HomeManager/>
        </Box>
      </Box>
    </>
  );
};

export default HubManager;
