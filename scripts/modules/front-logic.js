import React from 'react';
import ReactDOM from 'react-dom';
import * as DataLogic from './data-logic.js';
import SmallCardList from '../components/SmallCardList.jsx';
import Filter from '../components/Filter.jsx';
import * as Config from '../config/config';

var preloaderProcess;

var winWidth, winHeight;
$(document).ready(function(){
  winWidth = $(window).width();
  $(window).resize(function(){
    winWidth = $(window).width();
  });
});

function loadCards() {
  var loadButton = $('#loadMoreButton');

  loadButton.addClass('button_pushed').attr('disabled', 'disabled');
  var pokemonPromises = DataLogic.getArrayOfPokemonsWithRangeAndOffset(Config.cardsRange, Config.offset);
  Config.offset += Config.cardsRange;
  Promise.all(pokemonPromises).then((newPokemons) => {
    hidePreloader();
    loadButton.removeClass('button_pushed').removeAttr('disabled');
    DataLogic.pokemonsArray = DataLogic.pokemonsArray.concat(newPokemons);
    var pokemonsToShow = DataLogic.filterPokemons(DataLogic.pokemonsArray, DataLogic.selectedTypes);
    ReactDOM.render(
      <SmallCardList pokemons={pokemonsToShow}/>, document.getElementById('smallCard__container')
    );
  });
}


function loadFilter(){
  var filterPromise = DataLogic.getFilter();
  Promise.all([filterPromise]).then((filter) => {
    DataLogic.availableTypes = filter[0].availableTypes;
    ReactDOM.render(
      <Filter types={DataLogic.availableTypes}/>, document.getElementById('filter__container')
    );
    initFilterHandling();
  });
}

function initFilterHandling(){
  var filter = $('#filter'),
      select = filter.find('select.filter__select'),
      checkbox = filter.find('.filter__checkboxCont'),
      button = filter.find('button[name="submitFilter"]'),
      blocks = filter.find('.filter__hideCont');

  $('input').styler();
  $('select').multipleSelect({
    placeholder: 'Click to select types',
    selectAll: false,
    minimumCountSelected: 6,
    maxHeight: 350
  });

  var hideFilter = function(){
    DataLogic.selectedTypes.length = 0;
    blocks.addClass('filter__hideCont_overflowHidden');
    filter.removeClass('filter_active');
    ReactDOM.render(
      <SmallCardList pokemons={DataLogic.pokemonsArray}/>, document.getElementById('smallCard__container')
    );
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
    DataLogic.selectedTypes = select.val() !== null ? select.val() : []
    var pokemonsToShow = DataLogic.filterPokemons(DataLogic.pokemonsArray, DataLogic.selectedTypes);
    ReactDOM.render(
      <SmallCardList pokemons={pokemonsToShow}/>, document.getElementById('smallCard__container')
    );
  });
}


function showPreloader(){
  var casio = 0;
  var preloadConfig={
    pathStrokeWidth: 3,
    railStrokeColor: '#9da2a6',
    pathStrokeColor: '#374663'
  };
  preloaderProcess = setInterval(function(){
		casio++;
		if (casio==361) casio = 1;
		preloadConfig.startAng = casio;
		preloadConfig.endAng = casio + 90;
		$('.preloader').drawCircle(preloadConfig);
	}, 1);
}
function hidePreloader(){
  clearInterval(preloaderProcess);
  $('.preloader').addClass('animated fadeOut');
  $('.page').removeClass('hidden').addClass('animated fadeIn');
  setInterval(function(){
    $('.preloader').remove();
  }, 1500);
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
      }
      else {
        bigCardContainer.css('padding-top', 0);
      }
    });
}

export {
  loadCards,
  loadFilter,
  showPreloader,
  hidePreloader,
  initFloatingBigCard
}
