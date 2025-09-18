// theia-tree-widget.ts
import * as React from 'react';
import { injectable, inject } from '@theia/core/shared/inversify';
import {
    TreeWidget,
    TreeProps,
    TreeModel,
    ContextMenuRenderer,
    NodeProps,
    open
} from '@theia/core/lib/browser';
import { OpenerService } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';

@injectable()
export class TheiaTreeWidget extends TreeWidget {
    static readonly ID = 'theia-tree-widget';
    static readonly LABEL = 'Theia Tree';

    constructor(
        @inject(TreeProps) readonly props: TreeProps,
        @inject(TreeModel) readonly model: TreeModel,
        @inject(ContextMenuRenderer) readonly contextMenuRenderer: ContextMenuRenderer,
        @inject(OpenerService) protected readonly openerService: OpenerService
    ) {
        super(props, model, contextMenuRenderer);
        this.id = TheiaTreeWidget.ID;
        this.title.label = TheiaTreeWidget.LABEL;
        this.title.caption = TheiaTreeWidget.LABEL;
        this.title.iconClass = 'fa fa-sitemap';
        this.addClass('theia-tree-widget');

        // ensure first render
        this.update();
    }

    /**
     * Optionally customize how a node label is rendered.
     * We call super.renderCaption to keep built-in selection handling, icons, etc.
     */
    protected renderCaption(node: any, props: NodeProps): React.ReactNode {
        // You can add additional badges, icons or text here.
        return super.renderCaption(node, props);
    }

    /**
     * Double click opens a node (if it has a `uri` property).
     */
    protected async handleDoubleClickNode(node: any): Promise<void> {
        // some nodes may have a uri property that points to a file/resource
        const uriString = (node as any).uri;
        if (uriString) {
            try {
                // this.openerService.open(new URI(uriString));
                await open(this.openerService, new URI(uriString));
            } catch (e) {
                // fallback: just log in devtools
                // console.warn('Failed to open URI', uriString, e);
            }
        }
    }

    // hook single/double click events to the TreeWidget flow:
    protected onNodeDblClick(node: any): void {
        this.handleDoubleClickNode(node);
    }
}
