// @ts-check
const prototype = autoColorScheme.prototype;
function autoColorScheme(options={}) {
   const opt = {
         lightClass: "light",
         darkClass: "dark",
         mode: "class",
      };
   const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");
   const isEqualOptions = Object.keys(options).every((key) => JSON.stringify(options[key]) === JSON.stringify(opt[key]));
   Object.assign(opt, options);
   if (!prototype.colorSchemeOptions || !isEqualOptions) {
      prototype.colorSchemeOptions = opt;
   }
   let scheme = darkMedia.matches ? prototype.colorSchemeOptions.darkClass : prototype.colorSchemeOptions.lightClass;
   if (opt.mode === "attribute") {
      document.documentElement.setAttribute("data-theme", scheme);
      darkMedia.onchange = changeAttributeScheme;
      changeAttributeScheme(darkMedia);
   } else {
      document.documentElement.classList.add(scheme);
      darkMedia.onchange = changeClassScheme;
      changeClassScheme(darkMedia);
   }
}
function changeClassScheme(e) {
   if (e.matches) {
      document.documentElement.classList.replace(prototype.colorSchemeOptions.lightClass, prototype.colorSchemeOptions.darkClass);
   } else {
      document.documentElement.classList.replace(prototype.colorSchemeOptions.darkClass, prototype.colorSchemeOptions.lightClass);
   }
}
function changeAttributeScheme(e) {
   if (e.matches) {
      document.documentElement.setAttribute("data-theme", prototype.colorSchemeOptions.darkClass);
   } else {
      document.documentElement.setAttribute("data-theme", prototype.colorSchemeOptions.lightClass);
   }
}
module.exports = autoColorScheme;
