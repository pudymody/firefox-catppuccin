import Themes from "./themes.js"

const $light = document.querySelector("#light")
const $dark = document.querySelector("#dark")

const settings = await browser.storage.sync.get(["light", "dark"]);
Themes.forEach(function(t,i){
	const $option = document.createElement("option")
	$option.value = i;
	$option.textContent = t.title;
	$option.selected = (settings.light == i)

	const $darkOption = $option.cloneNode(true);
	$darkOption.selected = (settings.dark == i)

	$light.appendChild($option);
	$dark.appendChild( $darkOption );
});

document.addEventListener("change", function(e){
	let selectedIndex = parseInt(e.target.value, 10);
	if( isNaN(selectedIndex) || selectedIndex >= Themes.length ){
		selectedIndex = 0;
	}

	const isDarkMode = (e.target.id == "dark")
	if( isDarkMode ){
		browser.storage.sync.set({ dark: selectedIndex });
	}else{
		browser.storage.sync.set({ light: selectedIndex });
	}
})
