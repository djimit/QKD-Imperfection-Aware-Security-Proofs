import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { paperSections, attacks } from '../../data/qkd-data';
import { EvidenceBadgeComponent } from '../shared/evidence-badge/evidence-badge.component';

type SectionFilter = "All" | "Part I" | "Part II" | "Appendices";

@Component({
  selector: 'app-synthesis-view',
  templateUrl: './synthesis-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, EvidenceBadgeComponent],
})
export class SynthesisViewComponent {
  attacks = attacks;
  
  activeFilter = signal<SectionFilter>("All");
  filters: SectionFilter[] = ["All", "Part I", "Part II", "Appendices"];

  filteredSections = computed(() => {
    const filter = this.activeFilter();
    if (filter === "All") {
      return paperSections;
    }
    return paperSections.filter(s => s.part === filter);
  });
  
  setFilter(filter: SectionFilter) {
    this.activeFilter.set(filter);
  }
}
