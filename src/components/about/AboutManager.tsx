import { Box, Link, Pagehead } from '@primer/react';
import { DatalayerIcon, JupyterIcon } from '@datalayer/icons-react/solid';

const AboutManager = (): JSX.Element => {
  return (
    <>
      <Pagehead as="h1">
          🪐 ⚙️ Jupyter Manager
      </Pagehead>
      <Box p={3}>
        <Box as="p">
          Jupyter Manager is a user interface to configure, monitor and operate your Jupyter platform.
        </Box>
        <Box>
          <JupyterIcon size="large" colored/>
        </Box>
        <Box>
          "Jupyter" is a trademark of the NumFOCUS foundation, of which Project Jupyter is a part.
        </Box>
        <Box pt={3}>
          Jupyter Manager is developed with ❤️ by these <Link href="https://github.com/datalayer/jupyter-manager/graphs/contributors">wonderfull contributors</Link>.
        </Box>
        <Box pt={3}>
          <DatalayerIcon colored/> Copyright © 2023 Datalayer, Inc.
        </Box>
      </Box>
    </>
  )
}

export default AboutManager;
