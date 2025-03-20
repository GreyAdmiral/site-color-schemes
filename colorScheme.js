// @ts-check
const autoColorScheme = require("./autoColorScheme.js");
const prototype = autoColorScheme.prototype;
function colorScheme(options) {
   const opt = {
      selector: "[data-color-scheme]",
      lightClass: "light",
      darkClass: "dark",
      mode: "class",
   };
   try {
      Object.assign(opt, options);
      const button = document.querySelector(opt.selector);
      if (button) {
         prototype.colorSchemeButton = button;
         prototype.colorSchemeOptions = opt;
         document.addEventListener("DOMContentLoaded", colorSchemeLoad);
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
      autoColorScheme(prototype.colorSchemeOptions);
   } else {
      if (prototype.colorSchemeOptions.mode === "attribute") {
         document.documentElement.setAttribute("data-theme", saveScheme);
      } else {
         document.documentElement.classList.add(saveScheme);
      }
   }
   if (prototype.colorSchemeButton) {
      if (prototype.colorSchemeOptions.mode === "attribute") {
         prototype.colorSchemeButton.onclick = clickChangeAttributeScheme;
      } else {
         prototype.colorSchemeButton.onclick = clickChangeClassScheme;
      }
   }
}
function clickChangeClassScheme() {
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
function clickChangeAttributeScheme() {
   const isLight = document.documentElement.getAttribute("data-theme") === prototype.colorSchemeOptions.lightClass;
   const currentScheme = isLight ? prototype.colorSchemeOptions.lightClass : prototype.colorSchemeOptions.darkClass;
   let newScheme = "";
   if (currentScheme == prototype.colorSchemeOptions.lightClass) {
      newScheme = prototype.colorSchemeOptions.darkClass;
   } else if (currentScheme == prototype.colorSchemeOptions.darkClass) {
      newScheme = prototype.colorSchemeOptions.lightClass;
   }
   document.documentElement.setAttribute("data-theme", newScheme);
   localStorage.setItem("userScheme", newScheme);
}
module.exports = colorScheme;
