'use strict';

// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));

  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      var destination = response.data;
      var result = howlong.calculateDistances(localStorage['origin'], destination);
      alert(result);
      return result;
    });
  });  
}

  var title = "How long?";
  var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                       "onclick": genericOnClick});
