import React from 'react';
import ReactDOM from 'react-dom';
import * as RestClient from './rest-client';
import DetailedPokemon from '../viewmodels/detailed-pokemon';
import FilterModel from '../viewmodels/filter';
import SmallCardList from '../components/SmallCardList.jsx';
import Filter from '../components/Filter.jsx';
import * as Config from '../config/config';

var pokemonPromises = [],
  availableTypes = [],
  selectedTypes = [],
  pokemonsArray = [];

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

function loadCards() {
  var loadButton = document.getElementById('loadMoreButton');
  loadButton.classList.add("disabled");
  pokemonPromises = getArrayOfPokemonsWithRangeAndOffset(Config.cardsRange, Config.offset);
  Config.offset += Config.cardsRange;
  Promise.all(pokemonPromises).then((pokemons) => {
    document.getElementById('preload__container').classList.add("hidden");
    document.getElementById('loadMore').classList.remove("hidden");
    document.getElementById('filter').classList.remove("hidden");
    loadButton.classList.remove("disabled");
    pokemonsArray = pokemonsArray.concat(pokemons);
    if (selectedTypes.length > 0) {
      pokemonsArray = filterPokemons(pokemonsArray, selectedTypes);
    };
    ReactDOM.render(
      <SmallCardList pokemons={pokemonsArray}/>, document.getElementById('smallCard__container'));});
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

function loadFilter() {
  var filterPromise = getFilter();
  Promise.all([filterPromise]).then((filter) => {
    availableTypes = filter[0].availableTypes;
    ReactDOM.render(
      <Filter types={availableTypes}/>, document.getElementById('filter__container'));
    $('#filterSelect').material_select();
    initFilterHandling();
  });
}

function initFilterHandling() {
  var filter = $('form#filter');
  var activateBtn = filter.find('#activateFilter');
  var hiddenFields = filter.find('.filter__inputField_hiddenOnUnactive');

  activateBtn.click(function() {
    if (filter.hasClass('filter__active')) {
      selectedTypes.length = 0;
      Promise.all(pokemonPromises).then((pokemons) => {
        ReactDOM.render(
          <SmallCardList pokemons={pokemons}/>, document.getElementById('smallCard__container'));
      });
    } else {
      filter.addClass('filter__active');
    }
    hiddenFields.toggleClass('filter__inputField_active');
  });

  filter.submit(function(event) {
    event.preventDefault();
    selectedTypes = $('#filterSelect').val();
    Promise.all(pokemonPromises).then((pokemons) => {
      pokemons = filterPokemons(pokemons, selectedTypes);
      ReactDOM.render(
        <SmallCardList pokemons={pokemons}/>, document.getElementById('smallCard__container'));
    });
  });
}

function filterPokemons(pokemons, selectedTypes) {
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

export {loadCards, loadFilter}
