import HealthTimeline from '@/components/HealthTimeline';
import ActivityHeatmap from '@/components/ActivityHeatmap';

export default function HealthPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-bold text-white">Health & Activity</h1>
        <p className="mt-1 text-sm text-zinc-500">Relationship health trajectory and daily patterns</p>
      </header>
      <HealthTimeline />
      <ActivityHeatmap />
    </div>
  );
}
