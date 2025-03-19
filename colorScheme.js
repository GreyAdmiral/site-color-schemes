// @ts-check
const autoColorScheme = require("./autoColorScheme.js");
const prototype = autoColorScheme.prototype;
function colorScheme(options) {
   const opt = {
      selector: "[data-color-scheme]",
      lightClass: "light",
      darkClass: "dark",
   };
   try {
      Object.assign(opt, options);
      document.addEventListener("DOMContentLoaded", colorSchemeLoad);
      const button = document.querySelector(opt.selector);
      if (button) {
         prototype.colorSchemeButton = button;
         prototype.colorSchemeOptions = opt;
      } else {
         throw new Error(`Селектор ${opt.selector} не существует!`);
      }
   } catch (err) {
      console.error(err);
   }
}
function colorSchemeLoad() {
   const saveScheme = localStorage.getItem("userScheme");
   if (!saveScheme) {
      autoColorScheme();
   } else {
      document.documentElement.classList.add(saveScheme);
   }
   if (prototype.colorSchemeButton) {
      prototype.colorSchemeButton.onclick = clickChangeScheme;
   }
}
function clickChangeScheme() {
   let currentScheme = document.documentElement.classList.contains(prototype.colorSchemeOptions.lightClass)
      ? prototype.colorSchemeOptions.lightClass
      : prototype.colorSchemeOptions.darkClass;
   let newScheme = "";
   if (currentScheme == prototype.colorSchemeOptions.lightClass) {
      newScheme = prototype.colorSchemeOptions.darkClass;
   } else if (currentScheme == prototype.colorSchemeOptions.darkClass) {
      newScheme = prototype.colorSchemeOptions.lightClass;
   }
   document.documentElement.classList.replace(currentScheme, newScheme);
   localStorage.setItem("userScheme", newScheme);
}
module.exports = colorScheme;
