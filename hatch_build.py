from hatchling.builders.hooks.plugin.interface import BuildHookInterface


class CustomHook(BuildHookInterface):
    def initialize(self, version, build_data):
        if self.target_name == 'wheel':
            print('------- wheel')
        elif self.target_name == 'sdist':
            print('------- sdist')
