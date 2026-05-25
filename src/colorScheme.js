// @ts-check
import autoColorScheme from './autoColorScheme.js';
import { STATE, setOptions } from './state.js';
import { clickChangeClassScheme, clickChangeAttributeScheme } from './events.js';

/**
 * @param {Object} [options]
 * @param {string} [options.selector='[data-color-scheme]']
 * @param {string} [options.lightClass]
 * @param {string} [options.darkClass]
 * @param {string} [options.mode]
 */
export default function colorScheme(options) {
   if (options) setOptions(options);

   try {
      /**
       * @type {HTMLElement | null}
       */
      const button = document.querySelector(STATE.colorSchemeOptions.selector);

      if (button) {
         STATE.colorSchemeButton = button;

         if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', colorSchemeLoad, { once: true });
         } else {
            colorSchemeLoad();
         }
      } else {
         throw new Error(`Элемент по селектору ${STATE.colorSchemeOptions.selector} не найден!`);
      }
   } catch (err) {
      autoColorScheme();
      console.error(err);
   }
}

function colorSchemeLoad() {
   const saveScheme = localStorage.getItem('userScheme');

   if (!saveScheme) {
      autoColorScheme();
   } else {
      if (STATE.colorSchemeOptions.mode === 'attribute') {
         document.documentElement.setAttribute('data-theme', saveScheme);
      } else {
         document.documentElement.classList.add(saveScheme);
      }
   }

   if (STATE.colorSchemeButton) {
      if (STATE.colorSchemeOptions.mode === 'attribute') {
         STATE.colorSchemeButton.onclick = clickChangeAttributeScheme;
      } else {
         STATE.colorSchemeButton.onclick = clickChangeClassScheme;
      }
   }
}
