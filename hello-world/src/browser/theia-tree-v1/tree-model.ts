// import { injectable } from '@theia/core/shared/inversify';
// import { TreeImpl, CompositeTreeNode, TreeNode } from '@theia/core/lib/browser/tree';

// @injectable()
// export class MyTreeModel extends TreeImpl {
//     async initializeRoot(): Promise<void> {
//         const root: CompositeTreeNode = {
//             id: 'root',
//             name: 'Root',
//             parent: undefined!,
//             visible: true,
//             children: []
//         };

//         // Example children
//         root.children = [
//             { id: 'node1', name: 'First Item', parent: root, visible: true },
//             { id: 'node2', name: 'Second Item', parent: root, visible: true }
//         ] as TreeNode[];

//         this.root = root;
//     }
// }
