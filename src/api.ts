import axios from 'axios';
import type { Relevance } from './relevance';

export enum UserPersona {
  TEST = -1,
  MPAPlanner,
  MPAManager,
  CommunityOrganizer,
  LMMAPractitioner,
}

export interface Review {
  userPersona: UserPersona;
  madlib: string[];
  review: {[id: string]: Relevance};
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
