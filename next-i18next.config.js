const path = require('path')
// console.log(window.localStorage.i18nextLng)
module.exports = {
  i18n: {
    defaultLocale: 'th',
    localeDetection: false ,
    locales: ['th','en','cn'],

  },
  localePath: path.resolve('./public/locales'),

}