import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';
import enLocale from './locales/en.json';
import esLocale from './locales/es.json';

function initializeI18n() {
  addMessages('en', enLocale);
  addMessages('es', esLocale);
  
  init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });
}


export default initializeI18n;