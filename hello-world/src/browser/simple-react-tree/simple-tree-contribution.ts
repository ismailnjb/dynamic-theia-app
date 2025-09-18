// simple-tree-contribution.ts
import { injectable, inject } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution, WidgetManager, ApplicationShell } from '@theia/core/lib/browser';
import { SimpleTreeWidget } from './simple-tree-widget';

@injectable()
export class SimpleTreeContribution implements FrontendApplicationContribution {

    @inject(WidgetManager)
    protected readonly widgetManager: WidgetManager;

    @inject(ApplicationShell)
    protected readonly shell: ApplicationShell;

    async onStart(): Promise<void> {
        const widget = await this.widgetManager.getOrCreateWidget(SimpleTreeWidget.ID);
        // Add to left area (will appear as a tab in the left panel)
        this.shell.addWidget(widget, { area: 'left' });
        // optionally activate it so it's visible immediately:
        this.shell.activateWidget(widget.id);
    }
}
