//@ts-check
import { STATE } from './state.js';
import { setCookie } from './cookies.js';

/**
 * @param {MediaQueryListEventInit} e
 */
export function changeClassScheme(e) {
   if (e.matches) {
      document.documentElement.classList.replace(STATE.colorSchemeOptions.lightClass, STATE.colorSchemeOptions.darkClass);
   } else {
      document.documentElement.classList.replace(STATE.colorSchemeOptions.darkClass, STATE.colorSchemeOptions.lightClass);
   }
}

/**
 * @param {MediaQueryListEventInit} e
 */
export function changeAttributeScheme(e) {
   if (e.matches) {
      document.documentElement.setAttribute('data-theme', STATE.colorSchemeOptions.darkClass);
   } else {
      document.documentElement.setAttribute('data-theme', STATE.colorSchemeOptions.lightClass);
   }
}

export function clickChangeClassScheme() {
   const isCookiesStorage = STATE.colorSchemeOptions.storage === 'cookies';
   const isLight = document.documentElement.classList.contains(STATE.colorSchemeOptions.lightClass);
   const currentScheme = isLight ? STATE.colorSchemeOptions.lightClass : STATE.colorSchemeOptions.darkClass;
   let newScheme = '';

   if (currentScheme == STATE.colorSchemeOptions.lightClass) {
      newScheme = STATE.colorSchemeOptions.darkClass;
   } else if (currentScheme == STATE.colorSchemeOptions.darkClass) {
      newScheme = STATE.colorSchemeOptions.lightClass;
   }

   document.documentElement.classList.replace(currentScheme, newScheme);

   if (isCookiesStorage) {
      setCookie(STATE.storageTitle, newScheme);
   } else {
      localStorage.setItem(STATE.storageTitle, newScheme);
   }
}

export function clickChangeAttributeScheme() {
   const isCookiesStorage = STATE.colorSchemeOptions.storage === 'cookies';
   const isLight = document.documentElement.getAttribute('data-theme') === STATE.colorSchemeOptions.lightClass;
   const currentScheme = isLight ? STATE.colorSchemeOptions.lightClass : STATE.colorSchemeOptions.darkClass;
   let newScheme = '';

   if (currentScheme == STATE.colorSchemeOptions.lightClass) {
      newScheme = STATE.colorSchemeOptions.darkClass;
   } else if (currentScheme == STATE.colorSchemeOptions.darkClass) {
      newScheme = STATE.colorSchemeOptions.lightClass;
   }

   document.documentElement.setAttribute('data-theme', newScheme);

   if (isCookiesStorage) {
      setCookie(STATE.storageTitle, newScheme);
   } else {
      localStorage.setItem(STATE.storageTitle, newScheme);
   }
}

/**
 * @param {Function} cb
 */
export function cbInitial(cb) {
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => cb(), { once: true });
   } else {
      cb();
   }
}
