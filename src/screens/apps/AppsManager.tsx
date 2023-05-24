import { Box, NavList, Text } from '@primer/react'

const AppsManager = (): JSX.Element => {
  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Box sx={{minWidth: "200px"}}>
          <NavList>
            <NavList.Item>
              Voila
              <NavList.SubNav>
                <NavList.Item aria-current="page">
                  Running
                </NavList.Item>
                <NavList.Item >
                  All
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
            <NavList.Item>
              Panel
            </NavList.Item>
            <NavList.Item>
              Solara
            </NavList.Item>
          </NavList>
        </Box>
        <Box p={3}>
          <Text>Running Voila Applications</Text>
        </Box>
      </Box>
    </>
  );
};

export default AppsManager;
