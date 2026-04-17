import StatsOverview from '@/components/StatsOverview';
import PersonRatings from '@/components/PersonRatings';
import EarlyWarnings from '@/components/EarlyWarnings';

export default function Home() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Static sample dashboard. Upload your own chat on the{' '}
          <a href="/analyze" className="text-blue-400 hover:underline">
            Analyze
          </a>{' '}
          page for a real analysis.
        </p>
      </header>
      <StatsOverview />
      <PersonRatings />
      <EarlyWarnings />
    </div>
  );
}
