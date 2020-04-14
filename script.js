var yPosition = Math.floor(Math.random() * screen.height);
var xPosition = Math.floor(Math.random() * screen.width);

if (yPosition > 200) {
  yPosition = yPosition - 200;
}

if (xPosition > 200) {
  xPosition = xPosition - 200;
}

var img = document.createElement("IMG");

var imgURL;

function catAppearance() {
  var chance = Math.random();
  var catNum = selectRandom(1, 35);
  if (chance < 0.5) {
    var div = document.createElement("DIV");
    div.id = "cat";
    imgURL = chrome.extension.getURL("images/cat" + catNum + ".gif");
    img.src = imgURL;
    div.style.setProperty("--top-placement", yPosition + "px", "important");
    div.style.setProperty("--left-placement", xPosition + "px", "important");
    div.appendChild(img);
    document.body.appendChild(div);
    div.addEventListener("click", catClick);
  }
}

// selects random int inclusive
function selectRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function catClick() {
  const sound = new Audio();
  sound.src = chrome.extension.getURL("sounds/meow.mp3");
  sound.volume = 0.1;
  sound.play();
  img.src = chrome.extension.getURL("images/clicked.gif");
  window.setTimeout(function clearImage() {
    img.removeAttribute("src");
  }, 700);

  chrome.storage.sync.get("cats", function (profileObj) {
    var profile = profileObj;
    console.log("profile " + profile);
    // Check if any cats are found, only be done for first cat
    if (Object.keys(profile).length === 0) {
      // Add string of imgURL
      chrome.storage.sync.set({ cats: [imgURL] }, function () {
        console.log("added to storage");
      });
      var key = imgURL;
      var file = {};
      file[key] = 1;
      chrome.storage.sync.set(file, function () {
        console.log(imgURL + ":" + 1);
      });
    } else {
      // Seen multiple cats --> add more cats
      if (jQuery.inArray(imgURL, profile["cats"], 0) > -1) {
        chrome.storage.sync.get(imgURL, function (timesSeen) {
          var key = imgURL;
          var file = {};
          file[key] = timesSeen[imgURL] + 1;
          chrome.storage.sync.set(file, function () {
            console.log(file);
          });
        });
      } else {
        var cats = profile["cats"];
        cats.push(imgURL);
        chrome.storage.sync.set({ cats: cats }, function () {
          console.log("added cat to storage");
        });
        var key = imgURL;
        var file = {};
        file[key] = 1;
        chrome.storage.sync.set(file, function () {
          console.log(file);
        });
      }
    }
  });
}

catAppearance();
