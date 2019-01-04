var imageCount = {};
var imageOrder = [];

function sortImageList(imageCountObj) {

  //Create and sort list of clicked images in descending order
  var imageList = [];
	for(key in imageCountObj)
		if(imageCountObj.hasOwnProperty(key)) {
			imageList.push([key, imageCountObj[key]]);
    };
	imageList.sort((a, b)	=> b[1]-a[1]);

  //Create and update <ul> tracking most clicked images
  $("#imageListByCount").empty();
  var newUl = $("#imageListByCount").append("<ul></ul>");
  imageList.forEach(image => newUl.append("<li>" + image[0] + "</li>"));
};

function trackImageCount (e) {
  var element = e.target;
  var currImage = $(element).attr("src");

  //Increase image click count in imageCount object
  currImage in imageCount ? imageCount[currImage] ++ : imageCount[currImage] = 1;

  sortImageList(imageCount)
};

function setImageOrder (e) {
  var element = e.target;
  var currImage = $(element).attr("src");

  //Add image to imageOrder array if it's not there already, so that it will render in order on page load
  if (!imageOrder.includes(currImage)) {
    imageOrder.push(currImage);
  };

  //If all images have been clicked, store them in localStorage tobe rendered in order on page load
  if (imageOrder.length == 8) {
    localStorage.setItem("imageOrder", JSON.stringify(imageOrder));
  };
};

// INITIALIZERS
$(document).ready(() => {

  //If image order has been stored in localStorage, render in saved order
  if (localStorage.getItem("imageOrder") !== null) {
    var storedImageOrder = JSON.parse(localStorage.getItem("imageOrder"));
    var i = 0;
    storedImageOrder.forEach(image => {
      $("#image"+i).attr("src", storedImageOrder[i]);
      i++;
    });
    localStorage.removeItem("imageOrder");
  };

  //Create click handlers
  $(".image").on("click", (e) => {
    trackImageCount(e);
    setImageOrder(e);
  });
});
