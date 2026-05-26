'use strict';

//@ts-check

/**
 * @typedef {object} defaultOptions
 * @prop {string} selector='[data-color-scheme]'
 * @prop {string} resetSelector='[data-scheme-reset]'
 * @prop {string} lightClass
 * @prop {string} darkClass
 * @prop {'class' | 'attribute'} mode
 * @prop {'localStorage' | 'cookies'} storage
 */

/**
 * @typedef {object} STATE
 * @prop {string} storageTitle='userScheme'
 * @prop {defaultOptions} colorSchemeOptions
 * @prop {HTMLElement | null} [colorSchemeButton]
 * @prop {HTMLElement | null} [resetSchemeButton]
 */

/** @type {defaultOptions} */
const DEFAULT_OPTIONS = {
   selector: '[data-color-scheme]',
   resetSelector: '[data-scheme-reset]',
   lightClass: 'light',
   darkClass: 'dark',
   storage: 'localStorage',
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
function changeAttributeScheme(e) {
   const { lightClass, darkClass } = STATE.colorSchemeOptions;
   const root = document.documentElement;

   if (e.matches) {
      root.setAttribute('data-theme', darkClass);
   } else {
      root.setAttribute('data-theme', lightClass);
   }
}

function clickChangeClassScheme() {
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

function clickChangeAttributeScheme() {
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
 * @param {'localStorage' | 'cookies'} [options.storage]
 */
function colorScheme(options) {
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

var main = { auto: autoColorScheme, click: colorScheme };

module.exports = main;
