import * as RestClient from './rest-client';
import DetailedPokemon from '../viewmodels/detailed-pokemon';
import FilterModel from '../viewmodels/filter';

var pokemonsArray = [],
    availableTypes = [],
    selectedTypes = [];


function getPokemonById(id) {
  return RestClient.getJsonPokemonById(id).then((result) => {
    var jsonPokemon = JSON.parse(result);
    return convertJsonClassToViewModel(jsonPokemon);
  }).catch((error) => RestClient.handleError(error));
}

function convertJsonClassToViewModel(pokemonDetails) {
  var id = pokemonDetails.id;
  var name = pokemonDetails.name;
  var image = RestClient.getPokemonImageById(id);
  var weight = pokemonDetails.weight;
  var speed = pokemonDetails.stats[0].base_stat;
  var spDefense = pokemonDetails.stats[1].base_stat;
  var spAttack = pokemonDetails.stats[2].base_stat;
  var defense = pokemonDetails.stats[3].base_stat;
  var attack = pokemonDetails.stats[4].base_stat;
  var hp = pokemonDetails.stats[5].base_stat;
  var totalMoves = pokemonDetails.moves.length;
  var types = [];
  for (var i = 0; i < pokemonDetails.types.length; i++) {
    types.push(pokemonDetails.types[i].type.name);
  }
  return new DetailedPokemon(id, name, image, types, attack, defense, hp, spAttack, spDefense, speed, weight, totalMoves);
}

function getArrayOfPokemonsWithRangeAndOffset(range, offset) {
  var pokemonsArray = [];
  if (range > 0 && offset > 0) {
    for (var i = offset; i < range + offset; i++) {
      var pokemonPromise = getPokemonById(i);
      pokemonsArray.push(pokemonPromise);
    }
  }
  return pokemonsArray;
}


function getFilter() {
  return RestClient.getJsonAllTypes().then((result) => {
    var jsonTypesArray = JSON.parse(result);
    var types = [];
    for (var index = 0; index < jsonTypesArray.results.length; index++) {
      types.push(jsonTypesArray.results[index].name);
    }
    return new FilterModel(types);
  }).catch((error) => RestClient.handleError(error));
}

function filterPokemons(pokemons, selectedTypes) {
  if (selectedTypes.length == 0) return pokemons;
  var selectedPokemons = [];
  for (var pokemonIndex in pokemons) {
    var pokemon = pokemons[pokemonIndex];
    for (var typeIndex in pokemon.types) {
      var type = pokemon.types[typeIndex];
      if (selectedTypes.indexOf(type) != -1) {
        selectedPokemons.push(pokemon);
        break;
      }
    }
  }
  return selectedPokemons;
}


export {
  getFilter,
  getArrayOfPokemonsWithRangeAndOffset,
  filterPokemons,
  availableTypes,
  selectedTypes,
  pokemonsArray,
}
