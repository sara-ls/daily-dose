// New Tab JS
function displayStickerCollection() {
  chrome.storage.sync.get("stickers", (items) => {
    let cats_displayed = [];
    let div = document.createElement("DIV");
    div.id = "gifCollection";
    let img = document.createElement("IMG");
    img.maxHeight = 125;
    img.maxWidth = 125;
    img.setAttribute("alt", "cat-gif");
    if (items["stickers"]) {
      for (let i = 0; i < items["stickers"].length; i++) {
        let imgURL = items["stickers"][i];
        if (cats_displayed.indexOf(imgURL) === -1) {
          let img = document.createElement("IMG");
          img.onload = (function (img) {
            return function (event) {
              let winHeight = window.innerHeight / 3.5;
              while (img.height > winHeight) {
                img.height = img.height / 2;
              }
              img.bottom = Math.floor(Math.random() * screen.height - 250);
              img.left = Math.floor(Math.random() * screen.width + 100);
              img.position = "relative";
            };
          })(img);
          img.src = imgURL;
          div.appendChild(img);
        }
      }
      document.body.appendChild(div);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayStickerCollection();
});
