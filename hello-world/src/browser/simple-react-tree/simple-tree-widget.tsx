// simple-tree-widget.ts
import * as React from "react";
import { injectable } from "@theia/core/shared/inversify";
import { ReactWidget } from "@theia/core/lib/browser";

export interface SimpleNode {
    id: string;
    label: string;
    children?: SimpleNode[];
}

@injectable()
export class SimpleTreeWidget extends ReactWidget {
    static readonly ID = "simple-tree-widget";
    static readonly LABEL = "Simple Tree";

    protected data: SimpleNode[] = [
        {
            id: "root",
            label: "Root",
            children: [
                {
                    id: "a",
                    label: "Folder A",
                    children: [
                        { id: "a1", label: "File A1" },
                        { id: "a2", label: "File A2" },
                    ],
                },
                {
                    id: "b",
                    label: "Folder B",
                    children: [{ id: "b1", label: "File B1" }],
                },
            ],
        },
    ];

    protected expanded = new Set<string>();

    constructor() {
        super();
        this.id = SimpleTreeWidget.ID;
        this.title.label = SimpleTreeWidget.LABEL;
        this.title.caption = SimpleTreeWidget.LABEL;
        this.title.iconClass = "fa fa-sitemap";
        this.addClass("theia-simple-tree");
        this.update();
    }

    protected render(): React.ReactNode {
        return (
            <div style={{ padding: "6px" }}>{this.renderList(this.data)}</div>
        );
    }

    protected renderList(nodes: SimpleNode[]): React.ReactNode {
        return (
            <ul style={{ listStyle: "none", margin: 0, paddingLeft: "10px" }}>
                {nodes.map((n) => this.renderNode(n))}
            </ul>
        );
    }

    protected renderNode(node: SimpleNode): React.ReactNode {
        const hasChildren = !!(node.children && node.children.length);
        const isExpanded = this.expanded.has(node.id);
        return (
            <li key={node.id} style={{ margin: "2px 0" }}>
                <div
                    style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        cursor: hasChildren ? "pointer" : "default",
                    }}
                    onClick={() => hasChildren && this.toggle(node.id)}
                >
                    <span
                        style={{
                            width: 14,
                            textAlign: "center",
                            userSelect: "none",
                        }}
                    >
                        {hasChildren ? (isExpanded ? "▾" : "▸") : ""}
                    </span>
                    <span>{node.label}</span>
                </div>
                {hasChildren && isExpanded && (
                    <div style={{ paddingLeft: 12 }}>
                        {this.renderList(node.children!)}
                    </div>
                )}
            </li>
        );
    }

    protected toggle(id: string): void {
        if (this.expanded.has(id)) {
            this.expanded.delete(id);
        } else {
            this.expanded.add(id);
        }
        this.update();
    }
}
