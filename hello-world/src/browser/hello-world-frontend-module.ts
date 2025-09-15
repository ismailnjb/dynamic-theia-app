import { HelloWorldCommandContribution, HelloWorldMenuContribution } from './hello-world-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
import { StudioCommandContribution, StudioMenuContribution } from './studio-menu-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';
import { DetailsWidget } from './details-widget';
import { PropertiesWidget } from './properties-widget';
import { PropertiesContribution } from './properties-contribution';

export default new ContainerModule(bind => {
    bind(CommandContribution).to(HelloWorldCommandContribution);
    bind(MenuContribution).to(HelloWorldMenuContribution);

    bind(CommandContribution).to(StudioCommandContribution);
    bind(MenuContribution).to(StudioMenuContribution);

    bind(DetailsWidget).toSelf();

    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: DetailsWidget.ID,   
        createWidget: () => ctx.container.get(DetailsWidget)
    })).inSingletonScope();

    bind(PropertiesWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: PropertiesWidget.ID,
        createWidget: () => ctx.container.get(PropertiesWidget)
    })).inSingletonScope();
    

    bindViewContribution(bind, PropertiesContribution);
    bind(FrontendApplicationContribution).toService(PropertiesContribution);
});
