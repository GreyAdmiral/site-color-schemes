// @ts-check
const windowsPrototype = Object.getPrototypeOf(window);
module.exports = function (options) {
	const opt = {
		lightClass: "light",
		darkClass:  "dark",
	},
	darkMedia = window.matchMedia("(prefers-color-scheme: dark)");
	Object.assign(opt, options);
	if (!windowsPrototype.colorSchemeOptions) {
		windowsPrototype.colorSchemeOptions = opt;
	} else if (JSON.stringify(windowsPrototype.colorSchemeOptions) == JSON.stringify(opt)) {
		windowsPrototype.colorSchemeOptions = opt;
	}
	let scheme = darkMedia.matches ? windowsPrototype.colorSchemeOptions.darkClass : windowsPrototype.colorSchemeOptions.lightClass;
	document.documentElement.classList.add(scheme);
	darkMedia.addListener(changeScheme);
	changeScheme(darkMedia);
}
function changeScheme(e) {
	if (e.matches) {
		document.documentElement.classList.replace(windowsPrototype.colorSchemeOptions.lightClass, windowsPrototype.colorSchemeOptions.darkClass);
	} else {
		document.documentElement.classList.replace(windowsPrototype.colorSchemeOptions.darkClass, windowsPrototype.colorSchemeOptions.lightClass);
	}
}
