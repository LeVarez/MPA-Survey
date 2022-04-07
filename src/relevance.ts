export enum Relevance {
  Irrelevant = 1,
  Interesting,
  Relevant,
  Crucial
}

export const highlightColors: {[key in Relevance]: string} = {
  [Relevance.Irrelevant]: '#d1d1d1',
  [Relevance.Interesting]: '#f3fd9e',
  [Relevance.Relevant]: '#fbbf81',
  [Relevance.Crucial]: '#f79a9a'
};

export const relevanceOptions: {[key in Relevance]: string} = {
  [Relevance.Irrelevant]: 'Irrelevant',
  [Relevance.Interesting]: 'Interesting',
  [Relevance.Relevant]: 'Relevant',
  [Relevance.Crucial]: 'Crucial'
};

export const selectColor = '#c8deff';
