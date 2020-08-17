import listOfCountries = require('i18n-iso-countries');
export const getListOfCountries = () => {
  const countries = listOfCountries.getNames('en');
  countries['RU'] = 'Russia Federation';
  return countries;
}
