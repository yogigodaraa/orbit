import LoveAffection from '@/components/LoveAffection';
import ReciprocityGhosting from '@/components/ReciprocityGhosting';
import WordCloud from '@/components/WordCloud';

export default function LovePage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-bold text-white">Love & Affection</h1>
        <p className="mt-1 text-sm text-zinc-500">How they loved, expressed, and reciprocated</p>
      </header>
      <LoveAffection />
      <ReciprocityGhosting />
      <WordCloud />
    </div>
  );
}
