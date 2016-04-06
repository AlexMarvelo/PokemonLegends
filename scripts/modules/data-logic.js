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

var winWidth, winHeight;
$(document).ready(function(){
  winWidth = $(window).width();
  $(window).resize(function(){
    winWidth = $(window).width();
  });
});


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
  loadButton.classList.add("button_pushed");
  pokemonPromises = getArrayOfPokemonsWithRangeAndOffset(Config.cardsRange, Config.offset);
  Config.offset += Config.cardsRange;
  Promise.all(pokemonPromises).then((pokemons) => {
    hidePreloader();
    loadButton.classList.remove("button_pushed");
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
      <Filter types={availableTypes}/>, document.getElementById('filter__container')
    );
    initFilterHandling();
  });
}

// function initFilterHandling() {
//   var filter = $('form#filter');
//   var activateBtn = filter.find('#activateFilter');
//
//   activateBtn.click(function() {
//     if (filter.hasClass('filter__active')) {
//       selectedTypes.length = 0;
//       Promise.all(pokemonPromises).then((pokemons) => {
//         ReactDOM.render(
//           <SmallCardList pokemons={pokemons}/>, document.getElementById('smallCard__container'));
//       });
//     } else {
//       filter.addClass('filter__active');
//     }
//     hiddenFields.toggleClass('filter__inputField_active');
//   });
//
//   filter.submit(function(event) {
//     event.preventDefault();
//     selectedTypes = $('#filterSelect').val();
//     Promise.all(pokemonPromises).then((pokemons) => {
//       pokemons = filterPokemons(pokemons, selectedTypes);
//       ReactDOM.render(
//         <SmallCardList pokemons={pokemons}/>, document.getElementById('smallCard__container'));
//     });
//   });
// }

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

function initFilterHandling(){
  var filter = $('#filter');
  var select = filter.find('select.filter__select');
  var checkbox = filter.find('.filter__checkboxCont');
  var button = filter.find('button[name="submitFilter"]');
  var blocks = filter.find('.filter__hideCont');

  $('input').styler();
  $('select').multipleSelect({
    placeholder: 'Click to select types',
    selectAll: false,
    minimumCountSelected: 6,
    maxHeight: 350
  });

  var hideFilter = function(){
    blocks.addClass('filter__hideCont_overflowHidden');
    filter.removeClass('filter_active');
  };
  var showFilter = function(){
    setTimeout(function(){
      blocks.removeClass('filter__hideCont_overflowHidden');
    }, 300);
    filter.addClass('filter_active');
  };

  checkbox.click(function(){
    if (filter.hasClass('filter_active')){
      hideFilter();
    } else {
      showFilter();
    }
  });

  button.click(function(event){
    event.preventDefault();

  });
}


function showPreloader(){
  var casio = 0;
  var preloadConfig={
    pathStrokeWidth: 3,
    railStrokeColor: '#9da2a6',
    pathStrokeColor: '#374663'
  };
  setInterval(function(){
		casio++;
		if (casio==361) casio = 1;
		preloadConfig.startAng = casio;
		preloadConfig.endAng = casio + 90;
		$('.preloader').drawCircle(preloadConfig);
	}, 1);
}
function hidePreloader(){
  $('.preloader').addClass('animated fadeOut');
  $('.page').removeClass('hidden').addClass('animated fadeIn');
}


function initFloatingBigCard(){
  var bigCardContainer = $('#bigCard__container'),
      smallCardsContainer = $('#smallCard__container');

    $(window).scroll(function(){
      if (winWidth > 991){
        var offset = $(window).scrollTop(),
            listHeight = smallCardsContainer.height();
        if (offset > 65){
          if (offset < listHeight-415) bigCardContainer.css('padding-top', offset-65);
        } else {
          bigCardContainer.css('padding-top', 0);
        }
      } else {
        bigCardContainer.css('padding-top', 0);
      }
    });
}

export {
  loadCards,
  loadFilter,
  showPreloader,
  hidePreloader,
  initFloatingBigCard,
}
