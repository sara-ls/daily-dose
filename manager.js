// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var table = document.getElementById('catTable');
var tableBody = table.getElementsByTagName('tbody');
var url;

function displayCatCollection() {
  chrome.storage.sync.get('cats', function (profileObj) {
      var profile = profileObj;
      console.log(profile);
      if (jQuery.isEmptyObject(profile)) {
        return;
      } else {
        var i = 1;
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = "Catto Type";
        cell2.innerHTML = "Number of Times Seen";
        cell3.innerHTML = "Love Meter";

        var catArray = profile['cats'];
        for (var cat in catArray) {
          console.log(cat);

          url = catArray[cat];
          row = table.insertRow(i);
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          vcell3 = row.insertCell(2);

          var img = document.createElement("IMG");
          img.height = 100;
          img.width = 100;
          img.src = url;

          cell1.appendChild(img);

          var seen = chrome.storage.sync.get(url, function(counter) {
            return counter[url];
          });

          cell3.innerHTML = seen.toString();

          var loveMeter = 0;
          cell3.innerHTML = loveMeter.toString();
          i++;
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
