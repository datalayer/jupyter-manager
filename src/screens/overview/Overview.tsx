import { ProjectIcon } from '@primer/octicons-react';
import { Box, PageLayout, Text } from '@primer/react';
import { Link } from 'react-router-dom';

const Overview = (): JSX.Element => {
  return (
    <>
      <PageLayout>
        <PageLayout.Content>
          <Box display="flex">
            <Link to="/hub">
              <Box
                sx={{
                  p: 4,
                  m: 2,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 2,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'border.default',
                  boxShadow:
                    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                }}
              >
                <ProjectIcon fill="#1ABC9C" />
                <Text sx={{ ml: 2 }}>Manage Hub</Text>
              </Box>
            </Link>
            <Link to="/servers">
              <Box
                sx={{
                  p: 4,
                  m: 2,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 2,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'border.default',
                  boxShadow:
                    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                }}
              >
                <ProjectIcon fill="#1ABC9C" />
                <Text sx={{ ml: 2 }}>Manage Server</Text>
              </Box>
            </Link>
            <Link to="/kernels">
              <Box
                sx={{
                  p: 4,
                  m: 2,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 2,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'border.default',
                  boxShadow:
                    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                }}
              >
                <ProjectIcon fill="#1ABC9C" />
                <Text sx={{ ml: 2 }}>Manage Kernel</Text>
              </Box>
            </Link>
          </Box>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

export default Overview;
