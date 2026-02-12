import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { securityParameters, finiteSizePenalties } from '../../data/qkd-data';
import { EvidenceBadgeComponent } from '../shared/evidence-badge/evidence-badge.component';

@Component({
  selector: 'app-playbook-view',
  templateUrl: './playbook-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, EvidenceBadgeComponent],
})
export class PlaybookViewComponent {
  securityParameters = securityParameters;
  finiteSizePenalties = finiteSizePenalties;

  // Signal to track open accordion items. Using a Map for multiple open items.
  openSections = signal<Record<string, boolean>>({
    'c1': true, 'c2': true, 'c3': true, 'c4': true, 'c5': true
  });

  toggleSection(sectionId: string) {
    this.openSections.update(sections => ({
      ...sections,
      [sectionId]: !sections[sectionId]
    }));
  }
}
