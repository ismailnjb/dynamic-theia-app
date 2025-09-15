import { injectable, postConstruct } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import * as React from 'react';

@injectable()
export class PropertiesWidget extends ReactWidget {
  static readonly ID = 'my:properties-widget';
  static readonly LABEL = 'Properties';

  @postConstruct()
  protected async init(): Promise<void> {
    this.id = PropertiesWidget.ID;
    this.title.label = PropertiesWidget.LABEL;
    this.title.caption = PropertiesWidget.LABEL;
    this.title.closable = true; 
    this.title.iconClass = 'fa fa-list'; 
    this.update();
  }

  protected render(): React.ReactNode {
    return (
      <div className='theia-properties-widget' style={{ padding: '8px' }}>
        <h3>Properties</h3>
        <div>
          <p>No selection — select something to show properties.</p>
        </div>
      </div>
    );
  }
}
