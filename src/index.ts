import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { MainAreaWidget, ICommandPalette } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { LabIcon } from '@jupyterlab/ui-components';
import { ManagerWidget } from './widget';
import datalayerSvg from '../style/svg/datalayer-green.svg';

import '../style/index.css';

/**
 * The command IDs used by the react-widget plugin.
 */
namespace CommandIDs {
  export const create = 'create-jupyter-manager-widget';
}

/**
 * Initialization data for the @datalayer/jupyter-manager extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@datalayer/jupyter-manager:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  optional: [ISettingRegistry, ILauncher],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    settingRegistry: ISettingRegistry | null,
    launcher: ILauncher
  ) => {
    const { commands } = app;
    const command = CommandIDs.create;
    const datalayerIcon = new LabIcon({
      name: 'datalayer:icon',
      svgstr: datalayerSvg,
    });
    commands.addCommand(command, {
      caption: 'Show Jupyter Manager',
      label: 'Jupyter Manager',
      icon: (args: any) => datalayerIcon,
      execute: () => {
        const content = new ManagerWidget();
        const widget = new MainAreaWidget<ManagerWidget>({ content });
        widget.title.label = 'Jupyter Manager';
        widget.title.icon = datalayerIcon;
        app.shell.add(widget, 'main');
      }
    });
    const category = 'Jupyter Manager';
    palette.addItem({ command, category, args: { origin: 'from palette' } });
    if (launcher) {
      launcher.add({
        command,
        category: 'Datalayer',
        rank: -1
      });
    }
    console.log(
      'JupyterLab extension @datalayer/jupyter-manager is activated!'
    );
    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log(
            '@datalayer/jupyter-manager settings loaded:',
            settings.composite
          );
        })
        .catch(reason => {
          console.error(
            'Failed to load settings for @datalayer/jupyter-manager.',
            reason
          );
        });
    }
  }
};

export default plugin;
