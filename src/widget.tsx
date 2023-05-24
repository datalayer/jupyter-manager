import { ReactWidget } from '@jupyterlab/apputils';
import Manager from './Manager';

export class ManagerWidget extends ReactWidget {
  constructor() {
    super();
    this.addClass('dla-Container');
  }

  render(): JSX.Element {
    return <Manager loadDatalayerConfigFromPage={false} />;
  }
}
