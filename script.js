let yPosition = Math.floor(Math.random() * screen.height);
let xPosition = Math.floor(Math.random() * screen.width);

if (yPosition > 300) {
  yPosition = yPosition - 300;
}

if (xPosition > 300) {
  xPosition = xPosition - 300;
}

let img = document.createElement("IMG");

var imgURL;

function stickerAppearance() {
  const numCollectableGifs = 6;
  // Frequency of gif showing up
  let chance = Math.random();
  // Pick random collectable gif id
  let gifId = selectRandom(1, numCollectableGifs);
  if (chance < 0.5) {
    let div = document.createElement("DIV");
    div.id = "cat";
    imgURL = chrome.extension.getURL("images/collect" + gifId + ".gif");
    img.src = imgURL;
    div.style.setProperty("--top-placement", yPosition + "px", "important");
    div.style.setProperty("--left-placement", xPosition + "px", "important");
    div.appendChild(img);
    document.body.appendChild(div);
    div.addEventListener("click", stickerClick);
  }
}

// selects random int inclusive
function selectRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stickerClick() {
  const sound = new Audio();
  sound.src = chrome.extension.getURL("sounds/meow.mp3");
  sound.volume = 0.1;
  sound.play();
  img.src = chrome.extension.getURL("images/clicked.gif");
  window.setTimeout(function clearImage() {
    img.removeAttribute("src");
  }, 700);

  chrome.storage.sync.get("stickers", function (profileObj) {
    var profile = profileObj;
    console.log("profile " + profile);
    // Check if any stickers have been saved
    if (Object.keys(profile).length === 0) {
      // Add string of imgURL
      chrome.storage.sync.set({ stickers: [imgURL] }, function () {
        console.log("added to storage");
      });
      var key = imgURL;
      var file = {};
      file[key] = 1;
      chrome.storage.sync.set(file, function () {
        console.log(imgURL + ":" + 1);
      });
    } else {
      // Seen multiple stickers --> add new sticker
      if (jQuery.inArray(imgURL, profile["stickers"], 0) > -1) {
        chrome.storage.sync.get(imgURL, function (timesSeen) {
          var key = imgURL;
          var file = {};
          file[key] = timesSeen[imgURL] + 1;
          chrome.storage.sync.set(file, function () {
            console.log(file);
          });
        });
      } else {
        var stickers = profile["stickers"];
        stickers.push(imgURL);
        chrome.storage.sync.set({ stickers: stickers }, function () {
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

stickerAppearance();
