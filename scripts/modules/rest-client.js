function getJsonPromiseByUrl(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject('API request failed.');
      }
    };
    xhr.onerror= () => reject('API request failed.');
    xhr.send();
  });
}

function getJsonPokemonById(id) {
  return getJsonPromiseByUrl(`http://pokeapi.co/api/v2/pokemon/${id}/`);
}

function getJsonArrayOfPokemonsWithRangeAndOffset(range, offset) {
  return getJsonPromiseByUrl(`http://pokeapi.co/api/v2/pokemon/?limit=${range}&offset=${offset}`);
}

function getPokemonImageById(id) {
  var image = new Image();
  image.src = `http://pokeapi.co/media/img/${id}.png`;
  return image;
}

function getJsonAllTypes() {
  return getJsonPromiseByUrl('http://pokeapi.co/api/v2/type/?limit=999');
}

function handleError(errorMessage) {
  console.log(`${errorMessage} in rest-client module`);
}

export {
  getJsonPromiseByUrl,
  getJsonAllTypes,
  getJsonArrayOfPokemonsWithRangeAndOffset,
  getJsonPokemonById,
  getPokemonImageById,
  handleError
};
