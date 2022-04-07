import arrowRight from './arrow-right.svg';
import arrowLeft from './arrow-left.svg';
import arrowDown from './arrow-down.svg';
import trash from './icons_trash.svg';

import data from './icons_data.svg';


const icons = {
  arrows: {
    right: arrowRight,
    left: arrowLeft,
    down: arrowDown
  },
  data,
  trash
};

export const alignment = {
//   pm25: 'transform: translateY(-7%)',
//   sectors: 'transform: translateY(-8%)',
};

export const getIcon = (iconStr: string): string => {
  // fetches nested icons using dot notation
  // e.g: "menu.data" -> icons['menu']['data']
  type Icons = string | {[id: string]: Icons};
  const _getIcon = (cur: Icons, ...args: string[]) => {
    const [next, ...rest] = args;
    if (rest.length === 0) return cur[next] || '?';
    else {
      const args: [Icons, ...string[]] = [cur[next], ...rest];
      return _getIcon(...args);
    }
  };

  return _getIcon(icons, ...iconStr.split('.'));
};


export default icons;
