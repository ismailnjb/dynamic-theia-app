import { injectable } from 'inversify';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { FruitsTreeWidget } from './fruits-tree-widget';

@injectable()
export class FruitsContribution extends AbstractViewContribution<FruitsTreeWidget> {
    constructor() {
        super({
            widgetId: 'fruits-tree',            // must match the id in your widget
            widgetName: 'Fruits',               // visible label
            defaultWidgetOptions: { area: 'left' }, // puts it in the left pane
            toggleCommandId: 'fruits:toggle'    // command id to show/hide
        });
    }
}
