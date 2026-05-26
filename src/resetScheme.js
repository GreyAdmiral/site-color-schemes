import { deleteCookie } from './cookies.js';
import autoColorScheme from './autoColorScheme.js';
import { STATE } from './state.js';

export function clickResetScheme() {
   const isCookiesStorage = STATE.colorSchemeOptions.storage === 'cookies';

   if (isCookiesStorage) {
      deleteCookie(STATE.storageTitle);
   } else {
      localStorage.removeItem(STATE.storageTitle);
   }

   autoColorScheme();
}
