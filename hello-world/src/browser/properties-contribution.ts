import { injectable, inject } from 'inversify';
import { AbstractViewContribution } from '@theia/core/lib/browser/shell/view-contribution';
import { CommandRegistry, Command } from '@theia/core/lib/common';
import { FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { StatusBar, StatusBarAlignment } from '@theia/core/lib/browser/status-bar/status-bar-types';
import { PropertiesWidget } from './properties-widget';

export const PropertiesCommand: Command = {
  id: 'myextension.properties.toggle',
  label: 'Toggle Properties'
};

@injectable()
export class PropertiesContribution
  extends AbstractViewContribution<PropertiesWidget>
  implements FrontendApplicationContribution {

  @inject(StatusBar)
  protected readonly statusBar!: StatusBar;

  constructor() {
    super({
      widgetId: PropertiesWidget.ID,
      widgetName: PropertiesWidget.LABEL,
      defaultWidgetOptions: { area: 'bottom' },
      toggleCommandId: PropertiesCommand.id
    });
  }

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(PropertiesCommand, {
      execute: () => this.openView({ reveal: true, activate: true })
    });
  }


  async onStart(app: FrontendApplication): Promise<void> {
    await this.statusBar.setElement('myextension:properties', {
      text: '$(list) Properties',        
      alignment: StatusBarAlignment.LEFT, 
      priority: 100,
      tooltip: 'Open Properties panel',
      onclick: () => this.openView({ reveal: true, activate: true })
      // OR: command: PropertiesCommand.id  
    });
  }
}
