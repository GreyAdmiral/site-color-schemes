//@ts-check

/**
 * @typedef {object} defaultOptions
 * @prop {string} selector='[data-color-scheme]'
 * @prop {string} resetSelector='[data-scheme-reset]'
 * @prop {string} lightClass
 * @prop {string} darkClass
 * @prop {'class' | 'attribute'} mode
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
   mode: 'class',
};

/** @type {STATE} */
export const STATE = {
   colorSchemeOptions: { ...DEFAULT_OPTIONS },
   storageTitle: 'userScheme',
   colorSchemeButton: null,
   resetSchemeButton: null,
};

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
