import { ProjectIcon } from '@primer/octicons-react';
import { Box, Link, PageLayout, Text } from '@primer/react';

const Overview = (): JSX.Element => {
  return (
    <>
      <PageLayout>
        <PageLayout.Content>
          <Box display="flex">
            <Link href="/hub">
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
                <Text sx={{ ml: 2 }}>Hub Metrics</Text>
              </Box>
            </Link>
            <Link href="/servers">
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
                <Text sx={{ ml: 2 }}>Server Metrics</Text>
              </Box>
            </Link>
            <Link href="/kernels">
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
                <Text sx={{ ml: 2 }}>Kernel Metrics</Text>
              </Box>
            </Link>
          </Box>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

export default Overview;
