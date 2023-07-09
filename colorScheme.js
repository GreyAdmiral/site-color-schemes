// @ts-check
const autoColorScheme = require("./autoColorScheme.js"),
	windowsPrototype = Object.getPrototypeOf(window);
module.exports = function (options) {
	const opt = {
		selector: "[data-color-scheme]",
		lightClass: "light",
		darkClass:  "dark",
	};
	try {
		Object.assign(opt, options)
		document.addEventListener("DOMContentLoaded", colorSchemeLoad);
		const button = document.querySelector(opt.selector);
		if (button) {
			windowsPrototype.colorSchemeButton = button;
			windowsPrototype.colorSchemeOptions = opt;
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
	if (windowsPrototype.colorSchemeButton) {
		windowsPrototype.colorSchemeButton.onclick = clickChangeScheme;
	}
}
function clickChangeScheme() {
	let currentScheme = document.documentElement.classList.contains(windowsPrototype.colorSchemeOptions.lightClass) ? windowsPrototype.colorSchemeOptions.lightClass : windowsPrototype.colorSchemeOptions.darkClass,
		newScheme = "";
	if (currentScheme ==  windowsPrototype.colorSchemeOptions.lightClass) {
		newScheme = windowsPrototype.colorSchemeOptions.darkClass;
	} else if (currentScheme == windowsPrototype.colorSchemeOptions.darkClass) {
		newScheme =  windowsPrototype.colorSchemeOptions.lightClass;
	}
	document.documentElement.classList.replace(currentScheme, newScheme);
	localStorage.setItem("userScheme", newScheme);
}
