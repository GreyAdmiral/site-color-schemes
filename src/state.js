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
export const STATE = Object.seal({
   colorSchemeOptions: { ...DEFAULT_OPTIONS },
   storageTitle: 'userScheme',
   colorSchemeButton: null,
   resetSchemeButton: null,
});

/**
 * @param {Partial<defaultOptions>} [options]
 */
export function setOptions(options) {
   if (options) {
      STATE.colorSchemeOptions = { ...DEFAULT_OPTIONS, ...options };
   } else {
      STATE.colorSchemeOptions = { ...DEFAULT_OPTIONS };
   }
}
