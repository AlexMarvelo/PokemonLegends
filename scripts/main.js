// import * as DataLogic from './modules/data-logic.js';
//
// DataLogic.loadFilter();
// DataLogic.loadCards();
//
// document.getElementById('loadMoreButton').onclick = function(event){
//   event.preventDefault();
//   DataLogic.loadCards();
// };

var winWidth, winHeight;
$(document).ready(function(){
  winWidth = $(window).width();
  $(window).resize(function(){
    winWidth = $(window).width();
  });

  $('input').styler();
  $('select').multipleSelect({
    placeholder: 'Click to select types',
    selectAll: false,
    minimumCountSelected: 6,
    maxHeight: 350
  });


  // showPreloader();
  // setTimeout(hidePreloader, 2000);
  floatingBigCard();
  filterHandling();
});


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

function floatingBigCard(){
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

function filterHandling(){
  var filter = $('#filter');
  var select = filter.find('select.filter__select');
  var checkbox = filter.find('.filter__checkbox');
  var button = filter.find('button[name="submitFilter"]');
  var blocks = filter.find('.filter__hideCont');

  var hideFilter = function(){
    blocks.addClass('filter__hideCont_overflowHidden');
    filter.removeClass('filter_active');
  };
  var openFilter = function(){
    setTimeout(function(){
      blocks.removeClass('filter__hideCont_overflowHidden');
    }, 300);
    filter.addClass('filter_active');
  };

  checkbox.click(function(){
    if (filter.hasClass('filter_active')){
      hideFilter();
    } else {
      openFilter();
    }
  });

  button.click(function(){

  });
}
