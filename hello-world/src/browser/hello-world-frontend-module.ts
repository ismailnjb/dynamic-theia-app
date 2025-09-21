import {
    HelloWorldCommandContribution,
    HelloWorldMenuContribution,
} from "./hello-world/hello-world-contribution";
import { CommandContribution, MenuContribution } from "@theia/core/lib/common";
import { ContainerModule } from "@theia/core/shared/inversify";
import {
    StudioCommandContribution,
    StudioMenuContribution,
} from "./studio/studio-menu-contribution";
import {
    bindViewContribution,
    FrontendApplicationContribution,
    TreeModel,
    TreeProps,
    WidgetFactory,
} from "@theia/core/lib/browser";
import { DetailsWidget } from "./studio/details-widget";
import { PropertiesWidget } from "./properties/properties-widget";
import { BottomStatusBarContribution } from "./properties/bottom-status-bar-contribution";
import { PropertiesCommandContribution } from "./properties/properties-command-contribution";
import { SimpleTreeContribution } from "./simple-react-tree/simple-tree-contribution";
import { SimpleTreeWidget } from "./simple-react-tree/simple-tree-widget";
import { TheiaTreeContribution } from "./theia-tree-v2/theia-tree-contribution";
import { TheiaTreeWidget } from "./theia-tree-v2/theia-tree-widget";
import { TheiaTreeModel } from "./theia-tree-v2/theia-tree-model";
import { FruitsTree } from "./fruits-tree-implementation/fruits-tree";
import { FruitsTreeWidget } from "./fruits-tree-implementation/fruits-tree-widget";
import { FruitsContribution } from "./fruits-tree-implementation/fruits-contribution";

export default new ContainerModule((bind) => {
    bind(CommandContribution).to(HelloWorldCommandContribution);
    bind(MenuContribution).to(HelloWorldMenuContribution);

    bind(CommandContribution).to(StudioCommandContribution);
    bind(MenuContribution).to(StudioMenuContribution);

    bind(DetailsWidget).toSelf();

    bind(WidgetFactory)
        .toDynamicValue((ctx) => ({
            id: DetailsWidget.ID,
            createWidget: () => ctx.container.get(DetailsWidget),
        }))
        .inSingletonScope();

    bind(PropertiesWidget).toSelf().inSingletonScope();

    bind(WidgetFactory)
        .toDynamicValue((ctx) => ({
            id: PropertiesWidget.ID,
            createWidget: () => ctx.container.get(PropertiesWidget),
        }))
        .inSingletonScope();

    bind(BottomStatusBarContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(
        BottomStatusBarContribution
    );

    bind(PropertiesCommandContribution).toSelf().inSingletonScope();
    bind(CommandContribution).toService(PropertiesCommandContribution);

    // bind(MyTreeModel).toSelf().inSingletonScope();

    // bind(MyTreeWidget).toSelf();

    // bind(WidgetFactory).toDynamicValue(ctx => ({
    //     id: MyTreeWidget.ID,
    //     createWidget: () => {
    //         const child = ctx.container.createChild();
    //         child.bind(MyTreeModel).toSelf().inSingletonScope();
    //         child.bind(MyTreeWidget).toSelf();
    //         return child.get(MyTreeWidget);
    //     }
    // })).inSingletonScope();

    // bind(MyTreeContribution).toSelf().inSingletonScope();
    // bind(FrontendApplicationContribution).toService(MyTreeContribution);

    // Simple tree widget
    bind(SimpleTreeWidget).toSelf().inSingletonScope();
    bind(WidgetFactory)
        .toDynamicValue((ctx) => ({
            id: SimpleTreeWidget.ID,
            createWidget: () => ctx.container.get(SimpleTreeWidget),
        }))
        .inSingletonScope();

    // Contribution to place it in the left (explorer) area
    bind(SimpleTreeContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(SimpleTreeContribution);

    // Theia tree model and widget
    bind(TheiaTreeModel).toSelf().inSingletonScope();
    bind(TheiaTreeWidget).toSelf();

    // Create a dedicated factory so the widget receives its own model instance
    bind(WidgetFactory)
        .toDynamicValue((ctx) => ({
            id: TheiaTreeWidget.ID,
            createWidget: () => {
                const child = ctx.container.createChild();

                // Bind the TreeModel token to our TheiaTreeModel in the child container
                // so the TreeWidget receives the correct model instance.
                child.bind(TreeModel).to(TheiaTreeModel).inSingletonScope();

                // TreeProps is small; provide an empty object - TreeWidget/TreeModel manage real data.
                child.bind(TreeProps).toConstantValue(<any>{});

                child.bind(TheiaTreeWidget).toSelf();
                return child.get(TheiaTreeWidget);
            },
        }))
        .inSingletonScope();

    // Contribution to add to left area
    bind(TheiaTreeContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(TheiaTreeContribution);
    bind(FruitsTree).toSelf();

    bind(FruitsTreeWidget).toSelf();
    bind(WidgetFactory).toDynamicValue((ctx) => ({
        id: "fruits-tree",
        createWidget: () => ctx.container.get(FruitsTreeWidget),
    }));
      // 👇 this is the magic piece
    bindViewContribution(bind, FruitsContribution);
    bind(FruitsContribution).toSelf().inSingletonScope();
});
