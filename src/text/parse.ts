import { getSentences, getMDWords } from "src/util";

export interface TokenWithID {
  gid: string;
}

export interface Heading extends TokenWithID {
  type: 'heading';
  text: string;
  depth: number;
}

export interface Paragraph extends TokenWithID {
  type: 'paragraph';
  children: Sentence[];
}

export interface Sentence extends TokenWithID {
  type: 'sentence';
  text: string;
}

export interface ListItem extends TokenWithID {
  type: 'li';
  text: string;
}

export interface UnorderedList {
  type: 'ul';
  children: ListItem[];
}

export type Token = Heading | Paragraph | Sentence | ListItem | UnorderedList;

export const createParser = () => {
  let gid = 0;

  const nextId = () => (gid++).toString();

  const nextTokens = (lines: string[]): [Token, string[]] => {

    if (lines.length === 0) {
      return null;
    }

    // HEADING
    const match = /^(#+) /.exec(lines[0]);
    if (match) {
      const depth = match[1].length;
      const heading: Heading = {
        type: 'heading',
        depth,
        gid: nextId(),
        text: lines[0].substring(depth).trim(),
      };
      return [heading, lines.slice(1)];
    }

    // UNORDERED LIST

    if (lines[0].startsWith('* ')) {
      const li: ListItem[] = [];
      let remaining = [...lines];
      while (remaining.length > 0 && remaining[0].startsWith('* ')) {
        li.push({
          type: 'li',
          gid: nextId(),
          text: getMDWords(remaining[0].slice(2)),
        });
        remaining = remaining.slice(1);
      }
      const ul: UnorderedList = {
        type: 'ul',
        children: li,
      };
      return [ul, remaining];
    }

    // PARAGRAPH
    const paragraph: Paragraph = {
      type: 'paragraph',
      gid: nextId(),
      children: getSentences(lines[0])
        .map(s => ({
          type: 'sentence',
          gid: nextId(),
          text: getMDWords(s),
        })),
    };
    return [paragraph, lines.slice(1)];
  };

  function tokenizer(lines: string[]): Token[] {

    if (lines.length === 0) {
      return [];
    }

    const [token, remaining] = nextTokens(lines);
    return [token, ...tokenizer(remaining)];
  }

  return {
    parse(text: string): Token[] {
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      return tokenizer(lines);
    }
  };
};

