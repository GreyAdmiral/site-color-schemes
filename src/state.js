//@ts-check

/**
 * @typedef {object} defaultOptions
 * @prop {string} selector='[data-color-scheme]'
 * @prop {string} lightClass
 * @prop {string} darkClass
 * @prop {string} mode
 */

/**
 * @typedef {object} STATE
 * @prop {defaultOptions} colorSchemeOptions
 * @prop {HTMLElement | null} [colorSchemeButton]
 */

/** @type {defaultOptions} */
const DEFAULT_OPTIONS = {
   selector: '[data-color-scheme]',
   lightClass: 'light',
   darkClass: 'dark',
   mode: 'class',
};

/** @type {STATE} */
export const STATE = {
   colorSchemeOptions: { ...DEFAULT_OPTIONS },
   colorSchemeButton: null,
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
