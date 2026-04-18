'use client';

import React from 'react';
import { allConfigList } from '@/data/relationships/registry';
import type { RelationshipTypeId } from '@/data/relationships/types';

interface Props {
  value: RelationshipTypeId | null;
  onSelect: (id: RelationshipTypeId) => void;
}

export default function RelationshipSelector({ value, onSelect }: Props) {
  return (
    <div
      className="min-h-screen w-full px-6 py-16 md:py-24"
      style={{ backgroundColor: '#0a0b0f' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: '#e4e4e7' }}
          >
            Who is this chat with?
          </h1>
          <p
            className="mt-4 text-base md:text-lg"
            style={{ color: '#9ca3af' }}
          >
            We tune the analysis to the kind of relationship. Pick what fits best.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allConfigList.map((config) => {
            const isSelected = value === config.id;
            return (
              <button
                key={config.id}
                type="button"
                onClick={() => onSelect(config.id)}
                className={[
                  'group relative text-left rounded-2xl p-6 transition-all duration-200',
                  'border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
                  isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]',
                ].join(' ')}
                style={{
                  backgroundColor: '#12141c',
                  borderColor: isSelected ? config.theme.accent : '#1e2130',
                  boxShadow: isSelected
                    ? `0 0 0 1px ${config.theme.accent}, 0 10px 40px -10px ${config.theme.glow}`
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = config.theme.accent;
                    e.currentTarget.style.boxShadow = `0 8px 30px -12px ${config.theme.glow}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#1e2130';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {/* subtle gradient accent strip */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-60"
                  style={{ backgroundImage: config.theme.gradient }}
                />

                <div
                  className="mb-4 leading-none select-none"
                  style={{ fontSize: '42px' }}
                  aria-hidden
                >
                  {config.emoji}
                </div>

                <div
                  className="text-lg font-bold mb-1"
                  style={{ color: '#e4e4e7' }}
                >
                  {config.label}
                </div>

                <div
                  className="text-sm leading-relaxed"
                  style={{ color: '#9ca3af' }}
                >
                  {config.copy.selectorTagline}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
