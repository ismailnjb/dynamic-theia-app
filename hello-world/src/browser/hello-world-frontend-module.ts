import { HelloWorldCommandContribution, HelloWorldMenuContribution } from './hello-world-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
import {  StudioCommandContribution, StudioMenuContribution } from './studio-menu-contribution';
import { WidgetFactory } from '@theia/core/lib/browser';
import { DetailsWidget } from './details-widget';

export default new ContainerModule(bind => {
    bind(CommandContribution).to(HelloWorldCommandContribution);
    bind(MenuContribution).to(HelloWorldMenuContribution);

    bind(CommandContribution).to(StudioCommandContribution);
    bind(MenuContribution).to(StudioMenuContribution);

    // widget binding
    bind(DetailsWidget).toSelf();

    // widget factory binding
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: DetailsWidget.ID,   // must match getOrCreateWidget call
        createWidget: () => ctx.container.get(DetailsWidget)
    })).inSingletonScope();
});
