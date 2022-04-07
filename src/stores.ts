import { writable } from 'svelte/store';
import type { Relevance } from './relevance';

function createFeedback() {
  const { subscribe, set, update } = writable<{[id: string]: Relevance}>({});

  return {
    subscribe,
    set: (id: string, relevance: Relevance) => update(v => ({...v, [id]: relevance})),
    clear: (id) => update(v => {
      const { [id]: _, ...rest } = v;
      return rest;
    }),
    reset: () => set({})
  };
}

export const feedback = createFeedback();

export const updateFeedback = (fb) => {
  for (const [key, value] of Object.entries(fb)){
    feedback.set(key, value as Relevance);
  }
};
