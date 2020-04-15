// JS for Extension popup

var table = document.getElementById("stickerTable");
var url;
var row, cell1, cell2, cell3;
document.body.style.backgroundColor = "#e6e6e6";

function addRow(count, currentSticker, seen) {
  var heart = document.createElement("IMG");
  heart.height = 25;
  heart.width = 25;
  var seen2 = seen * 2;
  if (seen2 >= 46) {
    heart.src = chrome.extension.getURL("images/heart46.gif");
  } else {
    heart.src = chrome.extension.getURL("images/heart" + seen2 + ".gif");
  }
  var img = document.createElement("IMG");
  img.height = 25;
  img.width = 25;
  img.src = currentSticker;
  console.log(count);
  row = table.insertRow(count);
  cell1 = row.insertCell(0);
  cell2 = row.insertCell(1);
  cell1.appendChild(img);
  cell2.appendChild(heart);
}

function addRowForSticker(count, currentSticker) {
  chrome.storage.sync.get(currentSticker, function (timesSeen) {
    addRow(count, currentSticker, timesSeen[currentSticker]);
  });
}

function displayCatCollection() {
  chrome.storage.sync.get("stickers", function (profileObj) {
    var profile = profileObj;
    console.log(profile);
    if (jQuery.isEmptyObject(profile)) {
      return;
    } else {
      var i = 1;

      var stickerArray = profile["stickers"];
      for (var idx in stickerArray) {
        url = stickerArray[idx];
        addRowForSticker(i, url);
        i++;
      }
    }
  });
}

displayCatCollection();
