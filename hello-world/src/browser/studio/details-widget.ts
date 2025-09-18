import { Widget } from "@theia/core/lib/browser";
import { injectable } from "@theia/core/shared/inversify";

@injectable()
export class DetailsWidget extends Widget {
    static readonly ID = 'new-bank-project-widget';

    constructor() {
        super();
        this.id = DetailsWidget.ID;
        this.title.label = 'Details Tab';
        this.title.closable = true;

        this.node.innerHTML = `
        <div style="padding: 10px;">
            <h2>Create a New Details Panel </h2>
            <p>Details UI will go here.</p>
        </div>`;
    }
}
