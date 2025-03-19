// @ts-check
const prototype = autoColorScheme.prototype;
function autoColorScheme(options) {
   const opt = {
         lightClass: "light",
         darkClass: "dark",
      },
      darkMedia = window.matchMedia("(prefers-color-scheme: dark)");
   Object.assign(opt, options);
   if (!prototype.colorSchemeOptions) {
      prototype.colorSchemeOptions = opt;
   } else if (JSON.stringify(prototype.colorSchemeOptions) == JSON.stringify(opt)) {
      prototype.colorSchemeOptions = opt;
   }
   let scheme = darkMedia.matches ? prototype.colorSchemeOptions.darkClass : prototype.colorSchemeOptions.lightClass;
   document.documentElement.classList.add(scheme);
   darkMedia.onchange = changeScheme;
   changeScheme(darkMedia);
}
function changeScheme(e) {
   if (e.matches) {
      document.documentElement.classList.replace(prototype.colorSchemeOptions.lightClass, prototype.colorSchemeOptions.darkClass);
   } else {
      document.documentElement.classList.replace(prototype.colorSchemeOptions.darkClass, prototype.colorSchemeOptions.lightClass);
   }
}

module.exports = autoColorScheme;
