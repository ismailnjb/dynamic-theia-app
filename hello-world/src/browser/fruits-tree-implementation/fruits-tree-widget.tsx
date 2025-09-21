// fruits-tree-widget.ts
import * as React from 'react';
import { injectable, postConstruct } from 'inversify';
import { TreeWidget, TreeProps, TreeNode } from '@theia/core/lib/browser/tree';

@injectable()
export class FruitsTreeWidget extends TreeWidget {

    @postConstruct()
    protected init(): void {
        super.init();
        this.id = 'fruits-tree';
        this.title.label = 'Fruits';
        this.title.caption = 'Fruits Explorer';
        this.title.closable = true;
        this.title.iconClass = 'fa fa-apple'; // font-awesome icon
    }

    protected renderCaption(node: TreeNode): React.ReactNode {
        return <div>{node.name}</div>;
    }
}
