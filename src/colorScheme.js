// @ts-check
import autoColorScheme from './autoColorScheme.js';
import { STATE, setOptions } from './state.js';
import { clickChangeClassScheme, clickChangeAttributeScheme, cbInitial } from './events.js';
import { getCookie } from './cookies.js';
import { clickResetScheme } from './resetScheme.js';

/**
 * @param {Object} [options]
 * @param {string} [options.selector='[data-color-scheme]']
 * @param {string} [options.resetSelector='[data-scheme-reset]']
 * @param {string} [options.lightClass]
 * @param {string} [options.darkClass]
 * @param {'class' | 'attribute'} [options.mode]
 * @param {'local' | 'cookies'} [options.storage]
 */
export default function colorScheme(options) {
   if (options) setOptions(options);

   /** @type {HTMLElement | null} */
   const button = document.querySelector(STATE.colorSchemeOptions.selector);
   /** @type {HTMLElement | null} */
   const resetButton = document.querySelector(STATE.colorSchemeOptions.resetSelector);

   if (!button) {
      console.error(`Элемент по селектору ${STATE.colorSchemeOptions.selector} не найден!`);
      cbInitial(autoColorScheme);
      return;
   }

   STATE.colorSchemeButton = button;
   STATE.resetSchemeButton = resetButton;
   cbInitial(colorSchemeLoad);
}

function colorSchemeLoad() {
   const isCookiesStorage = STATE.colorSchemeOptions.storage === 'cookies';
   let saveScheme;

   if (isCookiesStorage) {
      saveScheme = getCookie(STATE.storageTitle);
   } else {
      saveScheme = localStorage.getItem(STATE.storageTitle);
   }

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

   if (STATE.resetSchemeButton) {
      STATE.resetSchemeButton.onclick = clickResetScheme;
   }
}
