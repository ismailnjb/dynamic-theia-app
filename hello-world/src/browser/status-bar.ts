import { injectable, inject } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { StatusBar, StatusBarAlignment } from '@theia/core/lib/browser/status-bar';

@injectable()
export class MyStatusBarContribution implements FrontendApplicationContribution {

    @inject(StatusBar)
    protected readonly statusBar: StatusBar;

    onStart(): void {
        this.statusBar.setElement('my-custom-status', {
            text: '$(rocket) Launch',
            alignment: StatusBarAlignment.LEFT,
            tooltip: 'Click to launch 🚀',
            command: 'my.command.id'
        });

        this.statusBar.setElement('my-info', {
            text: 'Properties',
            alignment: StatusBarAlignment.RIGHT,
            tooltip: 'Show info dialog',
            command: 'my.info.command'
        });
    }
}
