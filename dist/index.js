'use strict';

//@ts-check

/**
 * @typedef {object} defaultOptions
 * @prop {string} selector='[data-color-scheme]'
 * @prop {string} resetSelector='[data-scheme-reset]'
 * @prop {string} lightClass
 * @prop {string} darkClass
 * @prop {'class' | 'attribute'} mode
 * @prop {'local' | 'cookies'} storage
 */

/**
 * @typedef {object} STATE
 * @prop {defaultOptions} colorSchemeOptions
 * @prop {HTMLElement | null} [colorSchemeButton]
 * @prop {HTMLElement | null} [resetSchemeButton]
 * @prop {string} storageTitle
 */

/** @type {defaultOptions} */
const DEFAULT_OPTIONS = {
   selector: '[data-color-scheme]',
   resetSelector: '[data-scheme-reset]',
   lightClass: 'light',
   darkClass: 'dark',
   storage: 'local',
   mode: 'class',
};

/** @type {STATE} */
const STATE = Object.seal({
   colorSchemeOptions: { ...DEFAULT_OPTIONS },
   storageTitle: 'userScheme',
   colorSchemeButton: null,
   resetSchemeButton: null,
});

/**
 * @param {Partial<defaultOptions>} [options]
 */
function setOptions(options) {
   if (options) {
      STATE.colorSchemeOptions = { ...DEFAULT_OPTIONS, ...options };
   } else {
      STATE.colorSchemeOptions = { ...DEFAULT_OPTIONS };
   }
}

const LIFE_YEARS = 1;

function getMaxAge(year = 1) {
   const date = new Date();

   date.setFullYear(date.getFullYear() + year);
   return date.toUTCString();
}

function getCookie(name) {
   let matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
   return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value) {
   const options = {
      expires: getMaxAge(LIFE_YEARS),
      path: '/',
      domain: '',
      samesite: 'Lax',
   };

   if (options.expires instanceof Date) options.expires = options.expires.toUTCString();

   let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

   for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;

      let optionValue = options[optionKey];

      if (optionValue !== true) {
         updatedCookie += '=' + optionValue;
      }
   }

   document.cookie = updatedCookie;
}

function deleteCookie(name) {
   setCookie(name, '');
}

//@ts-check

/**
 * @param {MediaQueryListEventInit} e
 */
function changeClassScheme(e) {
   if (e.matches) {
      document.documentElement.classList.replace(STATE.colorSchemeOptions.lightClass, STATE.colorSchemeOptions.darkClass);
   } else {
      document.documentElement.classList.replace(STATE.colorSchemeOptions.darkClass, STATE.colorSchemeOptions.lightClass);
   }
}

/**
 * @param {MediaQueryListEventInit} e
 */
function changeAttributeScheme(e) {
   if (e.matches) {
      document.documentElement.setAttribute('data-theme', STATE.colorSchemeOptions.darkClass);
   } else {
      document.documentElement.setAttribute('data-theme', STATE.colorSchemeOptions.lightClass);
   }
}

function clickChangeClassScheme() {
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

function clickChangeAttributeScheme() {
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
function cbInitial(cb) {
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => cb(), { once: true });
   } else {
      cb();
   }
}

// @ts-check

/**
 * @param {Object} [options]
 * @param {string} [options.lightClass]
 * @param {string} [options.darkClass]
 * @param {'class' | 'attribute'} [options.mode]
 */
function autoColorScheme(options) {
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

function clickResetScheme() {
   const isCookiesStorage = STATE.colorSchemeOptions.storage === 'cookies';

   if (isCookiesStorage) {
      deleteCookie(STATE.storageTitle);
   } else {
      localStorage.removeItem(STATE.storageTitle);
   }

   autoColorScheme();
}

// @ts-check

/**
 * @param {Object} [options]
 * @param {string} [options.selector='[data-color-scheme]']
 * @param {string} [options.resetSelector='[data-scheme-reset]']
 * @param {string} [options.lightClass]
 * @param {string} [options.darkClass]
 * @param {'class' | 'attribute'} [options.mode]
 * @param {'local' | 'cookies'} [options.storage]
 */
function colorScheme(options) {
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

var main = { auto: autoColorScheme, click: colorScheme };

module.exports = main;
