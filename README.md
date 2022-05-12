## ABOUT PROJECT

Country list using CRA, Typescript and [restcountries API data](https://restcountries.com/).

## MAIN FEATURES
* List representation of countries from API.
* Option to sort list alphabetically in ascending or descending order.
* Filtering:
  * Ability to only show countries with area smaller than a specific country (`Lithuania` by default). 
  * Ability to only show countries from a specific region (`Oceania` by default).
  * Filter variables can be easily changed by replacing the strings for `countryName` in `smallerThanCountryFilter` and `region` in `regionFilter` in the `filters` object.
  * Both filters can be applied at the same time as well as ordered alphabetically seamlessly.
* Pagination.

## STARTING UP PROJECT

1. Set up a directory which contains files from this repository.
3. Make sure to run `npm install` to install dependencies.
4. Run `npm start` to start up the project.