import autoColorScheme from './autoColorScheme.js';
import { STATE } from './state.js';

export function clickResetScheme() {
   localStorage.removeItem(STATE.storageTitle);
   autoColorScheme();
}
