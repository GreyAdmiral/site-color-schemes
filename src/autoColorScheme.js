// @ts-check
import { changeClassScheme, changeAttributeScheme } from './events.js';
import { STATE, setOptions } from './state.js';

/**
 * @param {Object} [options]
 * @param {string} [options.lightClass]
 * @param {string} [options.darkClass]
 * @param {string} [options.mode]
 */
export default function autoColorScheme(options) {
   if (options) setOptions(options);

   const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
   let scheme = darkMedia.matches ? STATE.colorSchemeOptions.darkClass : STATE.colorSchemeOptions.lightClass;

   if (STATE.colorSchemeOptions.mode === 'attribute') {
      document.documentElement.setAttribute('data-theme', scheme);
      darkMedia.onchange = changeAttributeScheme;
      changeAttributeScheme(darkMedia);
   } else {
      document.documentElement.classList.add(scheme);
      darkMedia.onchange = changeClassScheme;
      changeClassScheme(darkMedia);
   }
}
