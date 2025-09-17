import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common';
import { WidgetManager, ApplicationShell } from '@theia/core/lib/browser';
import { PropertiesWidget } from './properties-widget';

export namespace MyCommands {
    export const OPEN_PROPERTIES: Command = {
        id: 'my.info.command',
        label: 'Open Properties'
    };
    export const ROCKET: Command = {
        id: 'my.command.id',
        label: 'Launch 🚀'
    };
}

@injectable()
export class MyCommandContribution implements CommandContribution {

    @inject(WidgetManager)
    protected readonly widgetManager: WidgetManager;

    @inject(ApplicationShell)
    protected readonly shell: ApplicationShell;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(MyCommands.ROCKET, {
            execute: () => alert('🚀 Launch clicked!')
        });

        registry.registerCommand(MyCommands.OPEN_PROPERTIES, {
            execute: async () => {
                const widget = await this.widgetManager.getOrCreateWidget<PropertiesWidget>(PropertiesWidget.ID);
                this.shell.addWidget(widget, { area: 'bottom' });
                this.shell.activateWidget(widget.id);
            }
        });
    }
}
