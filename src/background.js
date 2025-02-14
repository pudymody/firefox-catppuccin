import Themes from "./themes.js"

const media = matchMedia("(prefers-color-scheme: dark)");
media.addEventListener("change", function(e){
	const key = (e.matches ? "dark" : "light");
	browser.storage.sync.get(key).then(function(themeIndex){
		updateTheme(themeIndex[key]);
	})
});

function updateTheme(index){
	if( index == -1 ){
		browser.theme.reset();
		return;
	}
	browser.theme.update(Themes[index]);
}

browser.storage.sync.onChanged.addListener(function(changes){
	const color = Object.keys(changes);
	if( color[0] == "dark" && media.matches ){
		updateTheme(changes.dark.newValue);
	}
	if( color[0] == "light" && !media.matches ){
		updateTheme(changes.light.newValue);
	}
});


browser.storage.sync.get(["light", "dark"]).then(function({ light, dark }){
	if( media.matches && dark !== undefined ){
		updateTheme(dark);
		return;
	}

	if( !media.matches && light !== undefined ){
		updateTheme(light);
		return;
	}
});
