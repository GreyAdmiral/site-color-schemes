//@ts-check
import { STATE } from './state.js';

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
   const isLight = document.documentElement.classList.contains(STATE.colorSchemeOptions.lightClass);
   const currentScheme = isLight ? STATE.colorSchemeOptions.lightClass : STATE.colorSchemeOptions.darkClass;
   let newScheme = '';

   if (currentScheme == STATE.colorSchemeOptions.lightClass) {
      newScheme = STATE.colorSchemeOptions.darkClass;
   } else if (currentScheme == STATE.colorSchemeOptions.darkClass) {
      newScheme = STATE.colorSchemeOptions.lightClass;
   }

   document.documentElement.classList.replace(currentScheme, newScheme);
   localStorage.setItem('userScheme', newScheme);
}

export function clickChangeAttributeScheme() {
   const isLight = document.documentElement.getAttribute('data-theme') === STATE.colorSchemeOptions.lightClass;
   const currentScheme = isLight ? STATE.colorSchemeOptions.lightClass : STATE.colorSchemeOptions.darkClass;
   let newScheme = '';

   if (currentScheme == STATE.colorSchemeOptions.lightClass) {
      newScheme = STATE.colorSchemeOptions.darkClass;
   } else if (currentScheme == STATE.colorSchemeOptions.darkClass) {
      newScheme = STATE.colorSchemeOptions.lightClass;
   }

   document.documentElement.setAttribute('data-theme', newScheme);
   localStorage.setItem('userScheme', newScheme);
}
