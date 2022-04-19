import axios from 'axios';
import type { Relevance } from './relevance';

export interface Review {
  madlib: string[];
  review: {[id: string]: Relevance};
  chapterId: number;
}

export interface ServerReview extends Review {
  id: string;
}

const api = axios.create();

export function sendReview(review: Review) {
  return api.post('./api/review', review);
}

export async function getReviews(): Promise<ServerReview[]> {
  const res = await api.get<ServerReview[]>('./api/review');
  return res.data;
}
