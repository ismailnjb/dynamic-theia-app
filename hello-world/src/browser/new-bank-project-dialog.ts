// studio-contribution.ts
import {
    Command,
    MenuPath
} from '@theia/core/lib/common';

import { AbstractDialog } from '@theia/core/lib/browser/dialogs';

export const MAIN_MENU_BAR: MenuPath = ['menubar'];
export const STUDIO_MENU: MenuPath = [...MAIN_MENU_BAR, 'studio'];

export const NewBankProjectCommand: Command = {
    id: 'studio.newBankProject',
    label: 'New Bank Project'
};

export class NewBankProjectDialog extends AbstractDialog<void> {
    private inputElement!: HTMLInputElement;

    constructor() {
        super({ title: 'Create a New Bank Project' });
        this.appendCloseButton();

        const content = document.createElement('div');
        content.classList.add('new-bank-project-dialog');

        content.innerHTML = `
<div style="display:flex;flex-direction:column;gap:16px;padding:16px;min-width:380px;">
    <!-- Field -->
    <div style="display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:14px;font-weight:600;color:var(--theia-foreground);">Project name</label>
        <input 
            id="newBankProjectName" 
            type="text" 
            style="
                padding:8px 10px;
                border:1px solid var(--theia-border-color);
                border-radius:6px;
                font-size:14px;
                color:var(--theia-input-foreground);
                background-color:var(--theia-input-background);
                transition:border-color 0.2s, box-shadow 0.2s;
                min-width:320px;
            "
        />
        <p id="errorMsg" style="font-size:12px;color:var(--theia-errorForeground);margin-top:4px;min-height:16px;"></p>
    </div>
</div>
        `;

        this.contentNode.appendChild(content);

        this.inputElement = content.querySelector<HTMLInputElement>('#newBankProjectName')!;

    }

    get value(): void {
        return;
    }

    getProjectName(): string {
        return this.inputElement.value.trim();
    }
}

