// studio-contribution.ts
import { injectable, inject } from '@theia/core/shared/inversify';
import {
    Command,
    CommandContribution,
    CommandRegistry,
    MenuContribution,
    MenuModelRegistry,
    MenuPath
} from '@theia/core/lib/common';

import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { ApplicationShell } from '@theia/core/lib/browser/shell/application-shell';
import { NewBankProjectDialog } from './new-bank-project-dialog';
import { DetailsWidget } from './details-widget';

export const MAIN_MENU_BAR: MenuPath = ['menubar'];
export const STUDIO_MENU: MenuPath = [...MAIN_MENU_BAR, 'studio'];

export const StudioHelloCommand: Command = {
    id: 'studio.hello',
    label: 'Process Flow Editor'
};
export const NewBankProjectCommand: Command = {
    id: 'studio.newBankProject',
    label: 'New Bank Project'
};

export const DetailsPanelCommand: Command = {
    id: 'studio.detailsPanel',
    label: 'Details Tab'
};

@injectable()
export class StudioCommandContribution implements CommandContribution {
    @inject(WidgetManager)
    protected readonly widgetManager!: WidgetManager;

    @inject(ApplicationShell)
    protected readonly shell!: ApplicationShell;

    registerCommands(registry: CommandRegistry): void {
        console.log('[Studio] registerCommands called');

        registry.registerCommand(StudioHelloCommand, {
            execute: () => {
                console.log('Hello from Studio!');
                window.open('http://localhost:5173/', '_blank');
            }
        });

        registry.registerCommand(NewBankProjectCommand, {
            execute: async () => {
                const dlg = new NewBankProjectDialog();
                dlg.open().then(projectName => {
                    if (projectName) {
                        console.log('Create project:', projectName);
                    }
                });
            }
        });

        registry.registerCommand(DetailsPanelCommand, {
            execute: async () => {
                const widget = await this.widgetManager.getOrCreateWidget<DetailsWidget>(
                    DetailsWidget.ID
                );
                if (!widget.isAttached) {
                    this.shell.addWidget(widget /*, 'main' */);
                }
                this.shell.activateWidget(widget.id);
            }
        });
    }
}

@injectable()
export class StudioMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        console.log('[Studio] registerMenus called');

        menus.registerSubmenu(STUDIO_MENU, 'Studio', { sortString: '3' });
        menus.registerMenuAction(STUDIO_MENU, { commandId: StudioHelloCommand.id });
        menus.registerMenuAction(STUDIO_MENU, { commandId: NewBankProjectCommand.id });
        menus.registerMenuAction(STUDIO_MENU, { commandId: DetailsPanelCommand.id });
    }
}

