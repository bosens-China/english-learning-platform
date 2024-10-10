import { useEffect } from 'react';

export const useSwitchThemes = () => {
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    function matchMode(matches: boolean) {
      const body = document.body;
      if (matches) {
        if (!body.hasAttribute('theme-mode')) {
          body.setAttribute('theme-mode', 'dark');
        }
      } else {
        if (body.hasAttribute('theme-mode')) {
          body.removeAttribute('theme-mode');
        }
      }
    }

    const fn = (e: MediaQueryListEvent) => {
      matchMode(e.matches);
    };

    mql.addEventListener('change', fn);
    matchMode(mql.matches);
    return () => {
      mql.removeEventListener('change', fn);
    };
  }, []);
};
