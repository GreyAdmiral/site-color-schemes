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

   const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
   const scheme = darkMedia.matches ? STATE.colorSchemeOptions.darkClass : STATE.colorSchemeOptions.lightClass;

   if (STATE.colorSchemeOptions.mode === 'attribute') {
      document.documentElement.setAttribute('data-theme', scheme);
      darkMedia.onchange = changeAttributeScheme;
      changeAttributeScheme(darkMedia);
   } else {
      const isHasLight = document.documentElement.classList.contains(STATE.colorSchemeOptions.lightClass);
      const isHasDark = document.documentElement.classList.contains(STATE.colorSchemeOptions.darkClass);

      if (!isHasLight && !isHasDark) {
         document.documentElement.classList.add(scheme);
      } else if (isHasLight && isHasDark) {
         const extraScheme = darkMedia.matches ? STATE.colorSchemeOptions.lightClass : STATE.colorSchemeOptions.darkClass;
         document.documentElement.classList.remove(extraScheme);
      } else {
         if (isHasLight) document.documentElement.classList.replace(STATE.colorSchemeOptions.lightClass, scheme);
         if (isHasDark) document.documentElement.classList.replace(STATE.colorSchemeOptions.darkClass, scheme);
      }

      darkMedia.onchange = changeClassScheme;
      changeClassScheme(darkMedia);
   }
}
