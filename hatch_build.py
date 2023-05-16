import os

from subprocess import check_call

import shutil

from hatchling.builders.hooks.plugin.interface import BuildHookInterface


here = os.path.abspath(os.path.dirname(__file__))


def build_javascript():
    check_call(
        ['yarn', 'build:webpack'],
        cwd=here,
    )
    shutil.copyfile(
        './dist/main.jupyterManager.js',
        './jupyter_manager/static/main.jupyterManager.js'
    )


class JupyterManagerBuildHook(BuildHookInterface):
    def initialize(self, version, build_data):
        if self.target_name == 'editable':
            build_javascript()
        if self.target_name == 'wheel':
            build_javascript()
        elif self.target_name == 'sdist':
            build_javascript()
