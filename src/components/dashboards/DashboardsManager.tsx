import { Box, NavList, Text } from '@primer/react'

const DashboardsManager = (): JSX.Element => {
  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Box sx={{minWidth: "200px"}}>
          <NavList>
            <NavList.Item>
              Feature 1
              <NavList.SubNav>
                <NavList.Item aria-current="page">
                  Feature 1.1
                </NavList.Item>
                <NavList.Item >
                  Feature 1.2
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
            <NavList.Item>
              Feature 2
            </NavList.Item>
            <NavList.Item>
              Feature 3
            </NavList.Item>
          </NavList>
        </Box>
        <Box p={3}>
          <Text>Dashboards</Text>
        </Box>
      </Box>
    </>
  );
};

export default DashboardsManager;
