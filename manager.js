// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var div = document.createElement("DIV");
div.id = "catCollection";
var width = 0;
var height = 0;
var img = document.createElement("IMG");
img.maxHeight = 125;
img.maxWidth = 125;
var table = document.getElementById("catTable");


function displayCatCollection() {
    chrome.storage.sync.get('cats', function (profileObj) {
        var profile = profileObj;
        console.log(profile);
        if (jQuery.isEmptyObject(profile)) {
          return;
        } else {
          var catArray = profile['cats'];
          for (var cat in catArray) {
              var row = table.insertRow();
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);

              img.src = cat;
              cell1.appendChild(img);
              cell2.appendChild(chrome.storage.sync.get(cat, function (profileObj) {
                return profileObj[cat];
              }));
              cell3.appendData("0");
          }
        }
    });

  /**
  StorageArea.get(null, function(items) {
    var cats_displayed = [];
    var div = document.createElement("DIV");
    div.id = "catCollection";
    var width = 0;
    var height = 0;

    for (var item in items) {
      var imgURL = item.value;
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
   */
}

displayCatCollection();
