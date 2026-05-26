// @ts-check
import { changeClassScheme, changeAttributeScheme } from './events.js';
import { STATE, setOptions } from './state.js';

/**
 * @param {Object} [options]
 * @param {string} [options.lightClass]
 * @param {string} [options.darkClass]
 * @param {'class' | 'attribute'} [options.mode]
 */
export default function autoColorScheme(options) {
   if (options) setOptions(options);

   const root = document.documentElement;
   const { lightClass, darkClass, mode } = STATE.colorSchemeOptions;
   const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
   const scheme = darkMedia.matches ? darkClass : lightClass;
   const handler = mode === 'attribute' ? changeAttributeScheme : changeClassScheme;

   if (mode === 'attribute') {
      root.setAttribute('data-theme', scheme);
   } else {
      const classList = root.classList;
      const isHasLight = classList.contains(lightClass);
      const isHasDark = classList.contains(darkClass);

      if (!isHasLight && !isHasDark) {
         classList.add(scheme);
      } else if (isHasLight && isHasDark) {
         const extraScheme = darkMedia.matches ? lightClass : darkClass;
         classList.remove(extraScheme);
      } else {
         if (isHasLight) classList.replace(lightClass, scheme);
         if (isHasDark) classList.replace(darkClass, scheme);
      }
   }

   darkMedia.addEventListener('change', handler);
   handler(darkMedia);
}
