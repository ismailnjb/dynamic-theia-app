// fruits-tree.ts
import { injectable } from 'inversify';
import { TreeImpl, CompositeTreeNode, TreeNode } from '@theia/core/lib/browser/tree';

@injectable()
export class FruitsTree extends TreeImpl {
    async resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]> {
        if (parent.id === 'root') {
            return [
                { id: 'apple', name: 'Apple', parent, visible: true },
                { id: 'banana', name: 'Banana', parent, visible: true },
                { id: 'orange', name: 'Orange', parent, visible: true }
            ] as TreeNode[];
        }
        return [];
    }
}
