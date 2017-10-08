// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function displayCatCollection() {
  chrome.storage.sync.get("cats", function(items) {
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

displayCatCollection();
