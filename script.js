var rand = Math.floor(Math.random() * screen.height);
var rand2 = Math.floor(Math.random() * screen.width);

if (rand > 200) {
  rand = rand - 200;
}

if (rand2 > 200) {
  rand2 = rand2 - 200;
}

var img = document.createElement("IMG");
var div = document.createElement("DIV");
var imgURL;
const sound = new Audio();
sound.src = chrome.extension.getURL("sounds/meow.mp3");
sound.volume = 0.1;

function catAppearance() {
  var chance = Math.random();
  var catNum = selectRandom(1, 35);
  if (chance < 0.5) {
    div.id = "cat";
    imgURL = chrome.extension.getURL("images/cat" + catNum + ".gif");
    img.src = imgURL;
    div.style.setProperty("--top-placement", rand + "px", "important");
    div.style.setProperty("--left-placement", rand2 + "px", "important");
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
  sound.play();
  img.src = chrome.extension.getURL("images/clicked.gif");
  window.setTimeout(clearImage, 700);
  // check if any cats are found, should only be done for first cat
  chrome.storage.sync.get("cats", function (profileObj) {
    var profile = profileObj;
    console.log("profile " + profile);
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
      // Seen multiple cats, add more cats

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
          console.log("added to storage");
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

function clearImage() {
  img.removeAttribute("src");
}

catAppearance();
