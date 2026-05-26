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
 * @param {'localStorage' | 'cookies'} [options.storage]
 */
export default function colorScheme(options) {
   if (options) setOptions(options);

   const { selector = '[data-color-scheme]', resetSelector = '[data-scheme-reset]' } = STATE.colorSchemeOptions;
   /** @type {HTMLElement | null} */
   const button = document.querySelector(selector);
   /** @type {HTMLElement | null} */
   const resetButton = document.querySelector(resetSelector);

   if (!button) {
      console.error(`Элемент по селектору ${selector} не найден!`);
      cbInitial(autoColorScheme);
      return;
   }

   STATE.colorSchemeButton = button;
   STATE.resetSchemeButton = resetButton;
   cbInitial(colorSchemeLoad);
}

function colorSchemeLoad() {
   const { mode, lightClass, darkClass, storage } = STATE.colorSchemeOptions;
   const isCookiesStorage = storage === 'cookies';
   const savedScheme = isCookiesStorage ? getCookie(STATE.storageTitle) : localStorage.getItem(STATE.storageTitle);
   const root = document.documentElement;

   if (savedScheme) {
      if (mode === 'attribute') {
         root.setAttribute('data-theme', savedScheme);
      } else {
         const classList = document.documentElement.classList;
         const isHasLight = classList.contains(lightClass);
         const isHasDark = classList.contains(darkClass);

         if (!isHasLight && !isHasDark) {
            classList.add(savedScheme);
         } else if (isHasLight && isHasDark) {
            const extraScheme = savedScheme === lightClass ? darkClass : lightClass;
            classList.remove(extraScheme);
         } else {
            if (isHasLight) classList.replace(lightClass, savedScheme);
            if (isHasDark) classList.replace(darkClass, savedScheme);
         }
      }
   } else {
      autoColorScheme();
   }

   if (STATE.colorSchemeButton) {
      const handler = mode === 'attribute' ? clickChangeAttributeScheme : clickChangeClassScheme;
      STATE.colorSchemeButton.addEventListener('click', handler);
   }

   if (STATE.resetSchemeButton) {
      STATE.resetSchemeButton.addEventListener('click', clickResetScheme);
   }
}
