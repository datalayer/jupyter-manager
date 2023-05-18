import { Box, NavList } from '@primer/react'
import LegacyManager from './LegacyManager';

const HubManager = (): JSX.Element => {
  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Box sx={{minWidth: "200px"}}>
          <NavList>
            <NavList.Item aria-current="page">
              Legacy
            </NavList.Item>
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
            <NavList.Item>
              Servers
            </NavList.Item>
            <NavList.Item>
              Services
            </NavList.Item>
            <NavList.Item>
              Proxy routes
            </NavList.Item>
          </NavList>
        </Box>
        <Box>
          <LegacyManager/>
        </Box>
      </Box>
    </>
  );
};

export default HubManager;
