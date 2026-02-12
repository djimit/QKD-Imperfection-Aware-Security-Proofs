import { ChangeDetectionStrategy, Component, computed, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { blindSpots, GapType } from '../../data/qkd-data';
import { EvidenceBadgeComponent } from '../shared/evidence-badge/evidence-badge.component';

type BlindSpot = (typeof blindSpots)[0];
type BlindSpotFilter = "All" | GapType;

@Component({
  selector: 'app-blind-spots-view',
  templateUrl: './blind-spots-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, EvidenceBadgeComponent],
})
export class BlindSpotsViewComponent {
  filters: BlindSpotFilter[] = ["All", "Research", "Engineering", "Both"];
  activeFilter = signal<BlindSpotFilter>("All");

  selectedBlindSpot: WritableSignal<BlindSpot | null> = signal(null);

  filteredBlindSpots = computed(() => {
    const filter = this.activeFilter();
    if (filter === "All") {
      return blindSpots;
    }
    return blindSpots.filter(bs => bs.type === filter);
  });

  counts = computed(() => {
    return {
      All: blindSpots.length,
      Research: blindSpots.filter(bs => bs.type === 'Research' || bs.type === 'Both').length,
      Engineering: blindSpots.filter(bs => bs.type === 'Engineering' || bs.type === 'Both').length,
      Both: blindSpots.filter(bs => bs.type === 'Both').length
    };
  });

  setFilter(filter: BlindSpotFilter) {
    this.activeFilter.set(filter);
  }

  openDialog(spot: BlindSpot) {
    this.selectedBlindSpot.set(spot);
  }

  closeDialog() {
    this.selectedBlindSpot.set(null);
  }

  getGapTypeClass(type: GapType): string {
    switch (type) {
      case 'Research': return 'bg-blue-500/20 text-blue-300';
      case 'Engineering': return 'bg-amber-500/20 text-amber-300';
      case 'Both': return 'bg-fuchsia-500/20 text-fuchsia-300';
      default: return '';
    }
  }
}
