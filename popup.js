// JS for Extension popup

var table = document.getElementById("catTable");
var tableBody = table.getElementsByTagName("tbody");
var url;
var row, cell1, cell2, cell3;
document.body.style.backgroundColor = "#e6e6e6";

function addRow(count, currentCat, seen) {
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
  img.src = currentCat;
  console.log(count);
  row = table.insertRow(count);
  cell1 = row.insertCell(0);
  cell2 = row.insertCell(1);
  cell1.appendChild(img);
  cell2.appendChild(heart);
}

function addRowForCat(count, currentCat) {
  chrome.storage.sync.get(currentCat, function (timesSeen) {
    addRow(count, currentCat, timesSeen[currentCat]);
  });
}

function displayCatCollection() {
  chrome.storage.sync.get("cats", function (profileObj) {
    var profile = profileObj;
    console.log(profile);
    if (jQuery.isEmptyObject(profile)) {
      return;
    } else {
      var i = 1;

      var catArray = profile["cats"];
      for (var cat in catArray) {
        url = catArray[cat];
        addRowForCat(i, url);
        i++;
      }
    }
  });
}

displayCatCollection();
