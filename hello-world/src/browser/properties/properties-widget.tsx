import { injectable, postConstruct } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import * as React from 'react';

@injectable()
export class PropertiesWidget extends ReactWidget {
  static readonly ID = 'myextension:properties-widget';
  static readonly LABEL = 'Properties';

  @postConstruct()
  protected init(): void {
    this.id = PropertiesWidget.ID;
    this.title.label = PropertiesWidget.LABEL;
    this.title.closable = true;
    this.title.iconClass = 'fa fa-list';
    this.node.style.position = 'relative';
    this.node.style.minHeight = '160px';
    this.node.style.maxHeight = '600px';
    this.node.style.overflow = 'auto';
    this.update();
  }

  protected render(): React.ReactNode {
    return (
      <div style={{ padding: '8px' }}>
        <h3>Properties</h3>
        <div>No selection — select something to show properties.</div>
      </div>
    );
  }
}
