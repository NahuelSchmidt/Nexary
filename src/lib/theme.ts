export const THEME_STORAGE_KEY = 'nexary-theme';

/** Runs before paint (see layout) so the stored theme never flashes. Dark is the default. */
export const themeInitScript = `try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='light')document.documentElement.classList.add('light')}catch(e){}`;
