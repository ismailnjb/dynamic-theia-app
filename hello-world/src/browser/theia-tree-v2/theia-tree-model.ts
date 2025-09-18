// theia-tree-model.ts
import { injectable } from '@theia/core/shared/inversify';
import {
    TreeImpl,
    CompositeTreeNode,
    SelectableTreeNode
} from '@theia/core/lib/browser/tree';

/**
 * Simple TreeModel that sets a root with a few nodes.
 * Extend this to populate from the filesystem / workspace.
 */
@injectable()
export class TheiaTreeModel extends TreeImpl {

    protected async initializeRoot(): Promise<void> {
        // root node
        const root: CompositeTreeNode = {
            id: 'root',
            name: 'Workspace',
            parent: undefined!,
            visible: true,
            children: []
        };

        // folder node
        const folderA: CompositeTreeNode = {
            id: 'folder-a',
            name: 'Folder A',
            parent: root,
            visible: true,
            children: []
        };

        // files under folderA (selectable leaf nodes)
        const fileA1: SelectableTreeNode & { uri?: string } = {
            id: 'file-a1',
            name: 'File A1.txt',
            parent: folderA,
            visible: true,
            selected: false,
            uri: 'file:///tmp/a1.txt' // placeholder URI, replace when populating from workspace
        };

        const fileA2: SelectableTreeNode & { uri?: string } = {
            id: 'file-a2',
            name: 'File A2.txt',
            parent: folderA,
            visible: true,
            selected: false,
            uri: 'file:///tmp/a2.txt'
        };

        CompositeTreeNode.addChildren(folderA, [fileA1, fileA2]);

        // another folder with one file
        const folderB: CompositeTreeNode = {
            id: 'folder-b',
            name: 'Folder B',
            parent: root,
            visible: true,
            children: []
        };

        const fileB1: SelectableTreeNode & { uri?: string } = {
            id: 'file-b1',
            name: 'File B1.txt',
            parent: folderB,
            visible: true,
            selected: false,
            uri: 'file:///tmp/b1.txt'
        };
        CompositeTreeNode.addChildren(folderB, [fileB1]);

        CompositeTreeNode.addChildren(root, [folderA, folderB]);
        // attach children to root

        // finally set this.root so TreeWidget will render it
        this.root = root;
    }
}
