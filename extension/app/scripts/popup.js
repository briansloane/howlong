'use strict';

// $('#calculateButton').on('click', function() {
//   var origin = localStorage['origin'];
//   ///var destination = $('#inputDestination').val();
//   var destination = window.getSelection().toString();
//   howlong.calculateDistances(origin, destination);
// })

$(function(){
  //$('#calculateButton').click(function(){calculateSelection();});
  var results = calculateSelection();
});

function calculateSelection() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      var destination = response.data;
      return howlong.calculateDistances(localStorage['origin'], destination)
    });
  });
}