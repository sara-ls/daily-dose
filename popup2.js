// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var table = document.getElementById('catTable');
var tableBody = table.getElementsByTagName('tbody');
var url;
var row, cell1, cell2, cell3;

function addRow(count, currentCat, seen) {
  var img = document.createElement("IMG");
  img.height = 25;
  img.width = 25;
  img.src = currentCat;
  console.log(count);
  row = table.insertRow(count);
  cell1 = row.insertCell(0);
  cell2 = row.insertCell(1);
  cell3 = row.insertCell(2);
  cell1.appendChild(img);
  cell2.innerHTML = seen.toString();
  cell3.innerHTML = "0";
}

function callback(count, currentCat) {
  chrome.storage.sync.get(currentCat, function (timesSeen) {
    addRow(count, currentCat, timesSeen[currentCat]);
  });
}

function displayCatCollection() {
  chrome.storage.sync.get('cats', function (profileObj) {
      var profile = profileObj;
      console.log(profile);
      if (jQuery.isEmptyObject(profile)) {
        return;
      } else {
        var i = 1;
        row = table.insertRow(0);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);

        cell1.innerHTML = "Cat";
        cell2.innerHTML = "Encounters";
        cell3.innerHTML = "Love Meter";

        var catArray = profile['cats'];
        for (var cat in catArray) {
          url = catArray[cat];
          callback(i, url);
          i++;
        }
      }
  });
}
  /**
  StorageArea.get(null, function(items) {
    var cats_displayed = [];
    var div = document.createElement("DIV");
    div.id = "catCollection";
    var width = 0;
    var height = 0;
    console.log(items["cats"]);
    for (var i = 0; i < items["cats"].length; i++) {
      var imgURL = items["cats"][i];
      console.log(imgURL);
      if (cats_displayed.indexOf(imgURL) == -1) {
        var img = document.createElement("IMG");
        img.height = 100;
        img.width = 100;
        img.bottom = height;
        img.left = width;
        img.src = imgURL;
        img.position = "fixed";
        div.appendChild(img);
        if (width + 100 > window.innerWidth) {
          width = 0;
          height += 100;
        } else {
          width += 100;
        }
      }
    }
    document.body.appendChild(div);
  });
}
*/
setTimeout(function(){
    // DOM manipulation stuff
}, 0);
displayCatCollection();
