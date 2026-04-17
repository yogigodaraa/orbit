import Predictions from '@/components/Predictions';
import DeepPredictions from '@/components/DeepPredictions';

export default function PredictionsPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-bold text-white">Predictive Analysis</h1>
        <p className="mt-1 text-sm text-zinc-500">What the historical data says will happen next</p>
      </header>
      <DeepPredictions />
      <Predictions />
    </div>
  );
}
