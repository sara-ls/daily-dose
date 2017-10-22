function displayCatCollection() {
  chrome.storage.sync.get("cats", function(items) {
    var cats_displayed = [];
    var div = document.createElement("DIV");
    div.id = "catCollection";
    var w = 0;
    var h = 100;
    for (var i = 0; i < items["cats"].length; i++) {
      var imgURL = items["cats"][i];
      if (cats_displayed.indexOf(imgURL) == -1) {
        var img = document.createElement("IMG");
        img.onload = 
        function(img) {
          return function(event) {
            //console.log(event);
            //console.log(img.height);
              var winHeight = window.innerHeight / 3.5;
              while (img.height > winHeight) {
                console.log(img.height);

                img.height = img.height / 2;
                //img.width = img.width / 2;
              }
              img.bottom = Math.floor(Math.random() * screen.height - 250);;
              img.left = Math.floor(Math.random() * screen.width + 100);
              img.position = "relative";
           };
        } (img);
        img.src = imgURL;
        div.appendChild(img);
      }
    }
    document.body.appendChild(div);
  });
}

displayCatCollection();
