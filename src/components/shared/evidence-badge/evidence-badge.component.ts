import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvidenceLabel, EVIDENCE_COLORS } from '../../../data/qkd-data';

@Component({
  selector: 'app-evidence-badge',
  template: `
    <span
      class="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono rounded"
      [style.color]="styles().color"
      [style.border]="styles().border"
      [style.background-color]="styles().background"
    >
      [{{ label() }}]
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class EvidenceBadgeComponent {
  label = input.required<EvidenceLabel>();

  styles = computed(() => {
    const color = EVIDENCE_COLORS[this.label()];
    return {
      color: color,
      border: `1px solid ${color}`,
      background: `${color}1A`, // Using hex with alpha
    };
  });
}
