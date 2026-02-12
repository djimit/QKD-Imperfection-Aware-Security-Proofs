import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { protocols, ProtocolFamily } from '../../data/qkd-data';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class PortfolioViewComponent {
  protocols = protocols;
  
  // Use a map to track expanded state of each protocol family
  expandedStates = signal<Record<ProtocolFamily, boolean>>({
    'DD': false,
    'MDI': false,
    '1sDI': false,
    'DI': false,
  });

  toggleProtocol(family: ProtocolFamily) {
    this.expandedStates.update(states => ({
      ...states,
      [family]: !states[family],
    }));
  }

  // Helper to calculate width for trade-off bars (5 levels)
  getTradeoffWidth(level: number): string {
    return `${(level / 5) * 100}%`;
  }
}
