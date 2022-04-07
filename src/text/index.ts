import { createParser } from './parse';
import testA from './testA.md';
import testB from './testB.md';
import testC from './testC.md';

const parser = createParser();

export const chapter = [parser.parse(testA), parser.parse(testB), parser.parse(testC)];
