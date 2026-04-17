import SummaryTable from '@/components/SummaryTable';

export default function SummaryPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-bold text-white">Full Summary</h1>
        <p className="mt-1 text-sm text-zinc-500">Every dimension, side by side</p>
      </header>
      <SummaryTable />
    </div>
  );
}
