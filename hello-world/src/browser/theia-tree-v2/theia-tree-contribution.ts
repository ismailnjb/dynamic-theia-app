// theia-tree-contribution.ts
import { injectable, inject } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution, WidgetManager, ApplicationShell } from '@theia/core/lib/browser';
import { TheiaTreeWidget } from './theia-tree-widget';

@injectable()
export class TheiaTreeContribution implements FrontendApplicationContribution {

    @inject(WidgetManager)
    protected readonly widgetManager: WidgetManager;

    @inject(ApplicationShell)
    protected readonly shell: ApplicationShell;

    async onStart(): Promise<void> {
        const widget = await this.widgetManager.getOrCreateWidget(TheiaTreeWidget.ID);
        // add it to the left area (Explorer area). It will appear as a tab there.
        this.shell.addWidget(widget, { area: 'left' });

        // activate it so it's visible
        this.shell.activateWidget(widget.id);
    }
}
