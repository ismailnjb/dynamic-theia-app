import { injectable, inject } from '@theia/core/shared/inversify';
import { TreeProps, TreeWidget, TreeModel, TreeNode, NodeProps, TreeImpl } from '@theia/core/lib/browser/tree';
import { ContextMenuRenderer } from '@theia/core/lib/browser';

@injectable()
export class MyTreeWidget extends TreeWidget {
    static readonly ID = 'my-tree-widget';
    static readonly LABEL = 'My Tree';

    constructor(
        @inject(TreeProps) props: TreeProps,
        @inject(TreeModel) model: TreeModel,
        @inject(ContextMenuRenderer) contextMenuRenderer: ContextMenuRenderer
    ) {
        super(props, model, contextMenuRenderer);
        this.id = MyTreeWidget.ID;
        this.title.label = MyTreeWidget.LABEL;
        this.title.caption = MyTreeWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-sitemap';
    }

    protected renderNode(node: TreeNode, props: NodeProps): React.ReactNode {
        return super.renderNode(node, props);
    }
}
