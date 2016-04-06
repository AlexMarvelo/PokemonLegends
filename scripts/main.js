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

  showPreloader();
  setTimeout(hidePreloader, 2000);
  floatingBigCard();
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
