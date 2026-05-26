const LIFE_YEARS = 1;

function getMaxAge(year = 1) {
   const date = new Date();

   date.setFullYear(date.getFullYear() + year);
   return date.toUTCString();
}

export function getCookie(name) {
   let matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
   return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value) {
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

export function deleteCookie(name) {
   setCookie(name, '', {
      'max-age': -1,
   });
}
