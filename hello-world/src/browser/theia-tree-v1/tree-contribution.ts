// import { injectable, inject } from '@theia/core/shared/inversify';
// import { FrontendApplicationContribution, ApplicationShell, WidgetManager } from '@theia/core/lib/browser';
// import { MyTreeWidget } from './tree-widget';


// @injectable()
// export class MyTreeContribution implements FrontendApplicationContribution {

//     @inject(ApplicationShell)
//     protected readonly shell: ApplicationShell;

//     @inject(WidgetManager)
//     protected readonly widgetManager: WidgetManager;

//     async onStart(): Promise<void> {
//         const widget = await this.widgetManager.getOrCreateWidget(MyTreeWidget.ID);
//         this.shell.addWidget(widget, { area: 'left' });
//     }
// }
