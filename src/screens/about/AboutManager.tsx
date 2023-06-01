import { Box, Link, Pagehead } from '@primer/react';
import { DatalayerGreenIcon, JupyterIcon } from '@datalayer/icons-react/default';

const AboutManager = (): JSX.Element => {
  return (
    <Box p={3}>
      <Pagehead as="h1">
          🪐 🧞‍♂️ Jupyter Manager
      </Pagehead>
      <Box>
        <Box>
          Jupyter Manager is a user interface to configure, monitor and operate your Jupyter platform and is developed with ❤️ by these <Link href="https://github.com/datalayer/jupyter-manager/graphs/contributors">wonderfull contributors</Link>.
        </Box>
        <Box pt={3}>
          <DatalayerGreenIcon colored/> Copyright © 2023 Datalayer, Inc.
        </Box>
        <Box pt={3}>
          <JupyterIcon colored/> Jupyter is a trademark of the NumFOCUS foundation, of which Project Jupyter is a part.
        </Box>
      </Box>
    </Box>
  )
}

export default AboutManager;
