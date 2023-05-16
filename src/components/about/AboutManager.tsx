import { Box } from '@primer/react';
import { DatalayerIcon } from '@datalayer/icons-react/solid';

const AboutManager = (): JSX.Element => {
  return (
    <Box p={3}>
      <Box as="h1">
        🪐 ⚙️ Jupyter Manager
      </Box>
      <Box as="p">
        Jupyter Manager is a user interface to configure, monitor and operate your Jupyter platform.
      </Box>
      <Box>
        <DatalayerIcon colored/> (c) Datalayer, 2023
      </Box>
    </Box>
  )
}

export default AboutManager;
