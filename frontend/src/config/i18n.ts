import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18next
    .use(initReactI18next) // Bindning till React
    .use(LanguageDetector) // Språkdetektion (valfritt)
    .use(HttpApi) // Laddar översättningar från JSON-filer
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'sv'],
        backend: {
            loadPath: 'language/{{lng}}.json', // Översättningsfiler
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator'],
            caches: ['cookie'],
        },
        interpolation: {
            escapeValue: false, // React hanterar XSS-skydd
        },
    });

export default i18next;