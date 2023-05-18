import { useSelector } from 'react-redux';
import { Box, NavList } from '@primer/react'
import validator from '@rjsf/validator-ajv8';
import Form from '@datalayer/rjsf-primer';
import { MainState } from '../../redux/store';
import { ConfigState } from '../../redux/state/config';

const ServersManager = (): JSX.Element => {
  const config = useSelector<MainState, ConfigState>(state => state.config);
  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Box sx={{minWidth: "200px"}}>
          <NavList>
            <NavList.Item>
              All servers
            </NavList.Item>
            <NavList.Item>
              Server extensions
              <NavList.SubNav>
                <NavList.Item >
                  Home
                </NavList.Item>
                <NavList.Item aria-current="page">
                  Configuration
                </NavList.Item>
                <NavList.Item >
                  Monitoring
                </NavList.Item>
                <NavList.Item >
                  Status
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
          </NavList>
        </Box>
        <Box>
          { config?.config_schema && <Form schema={config.config_schema} formData={config.config} validator={validator} /> }
        </Box>
      </Box>
    </>
  );
};

export default ServersManager;
