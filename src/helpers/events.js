//@ts-check
import { STATE } from './state.js';
import { setCookie } from './cookies.js';

/**
 * @param {MediaQueryListEventInit} e
 */
export function changeClassScheme(e) {
   const { lightClass, darkClass } = STATE.colorSchemeOptions;
   const classList = document.documentElement.classList;

   if (e.matches) {
      classList.replace(lightClass, darkClass);
   } else {
      classList.replace(darkClass, lightClass);
   }
}

/**
 * @param {MediaQueryListEventInit} e
 */
export function changeAttributeScheme(e) {
   const { lightClass, darkClass } = STATE.colorSchemeOptions;
   const root = document.documentElement;

   if (e.matches) {
      root.setAttribute('data-theme', darkClass);
   } else {
      root.setAttribute('data-theme', lightClass);
   }
}

export function clickChangeClassScheme() {
   const { lightClass, darkClass, storage } = STATE.colorSchemeOptions;
   const isCookiesStorage = storage === 'cookies';
   const classList = document.documentElement.classList;
   const isLight = classList.contains(lightClass);
   const currentScheme = isLight ? lightClass : darkClass;
   let newScheme = '';

   if (currentScheme == lightClass) {
      newScheme = darkClass;
   } else if (currentScheme == darkClass) {
      newScheme = lightClass;
   }

   classList.replace(currentScheme, newScheme);

   if (isCookiesStorage) {
      setCookie(STATE.storageTitle, newScheme);
   } else {
      localStorage.setItem(STATE.storageTitle, newScheme);
   }
}

export function clickChangeAttributeScheme() {
   const { lightClass, darkClass, storage } = STATE.colorSchemeOptions;
   const isCookiesStorage = storage === 'cookies';
   const root = document.documentElement;
   const isLight = root.getAttribute('data-theme') === lightClass;
   const currentScheme = isLight ? lightClass : darkClass;
   let newScheme = '';

   if (currentScheme == lightClass) {
      newScheme = darkClass;
   } else if (currentScheme == darkClass) {
      newScheme = lightClass;
   }

   root.setAttribute('data-theme', newScheme);

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
