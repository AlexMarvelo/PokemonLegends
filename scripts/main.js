import * as DataLogic from './modules/data-logic.js';


$(document).ready(function(){
  DataLogic.showPreloader();
  DataLogic.loadFilter();
  DataLogic.loadCards();
  DataLogic.initFloatingBigCard();

  $('#loadMoreButton').click(function(event){
    event.preventDefault();
    DataLogic.loadCards();
  });
});
