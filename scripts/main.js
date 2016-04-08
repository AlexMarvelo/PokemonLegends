import * as FrontLogic from './modules/front-logic.js';


$(document).ready(function(){
  FrontLogic.showPreloader();
  FrontLogic.loadFilter();
  FrontLogic.loadCards();
  FrontLogic.initFloatingBigCard();

  $('#loadMoreButton').click(function(event){
    event.preventDefault();
    FrontLogic.loadCards();
  });
});
