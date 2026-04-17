import ConflictAnalysis from '@/components/ConflictAnalysis';
import PsychPatterns from '@/components/PsychPatterns';
import Extremes from '@/components/Extremes';

export default function ConflictPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-bold text-white">Conflict & Psychology</h1>
        <p className="mt-1 text-sm text-zinc-500">Who starts, escalates, and the patterns beneath</p>
      </header>
      <ConflictAnalysis />
      <PsychPatterns />
      <Extremes />
    </div>
  );
}
