export const fetchCountries = function (name) {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

// second version version

// export const fetchCountries = function (name) {
//   return fetch(`https://restcountries.com/v2/name/${name}`).then(response =>
//     response.json()
//   );
// };
