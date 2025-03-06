
import { I18n } from 'i18n-js';
import * as RNLocalize from 'react-native-localize';


import en from './locales/en.json';
import tr from './locales/tr.json';
import de from './locales/de.json';


const i18n = new I18n({
    en,
    tr,
    de,
});


i18n.fallbacks = true;
i18n.defaultLocale = 'tr';

const fallback = { languageTag: 'tr', isRTL: false };
const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback;
i18n.locale = languageTag;


export const setLanguage = (lang) => {
    i18n.locale = lang;
};


export default i18n;
