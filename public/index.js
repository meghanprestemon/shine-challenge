var imageCount = {}
var imageOrder = []
var imageList = []

function trackImageCount (e) {
  var element = e.target;
  var currImage = $(element).attr("src");

  if (currImage in imageCount) {
    imageCount[currImage] = imageCount[currImage] + 1
  } else {
    imageCount[currImage] = 1
  }

  sortImageList(imageCount)
}

function sortImageList(imageCountObj) {
  // convert object into array
	for(var key in imageCountObj)
		if(imageCountObj.hasOwnProperty(key))
			imageList.push([key, imageCountObj[key]]);

	// sort items by value
	imageList.sort(function(a, b)
	{
	  return a[1]-b[1]; // compare numbers
	});
}

function setImageOrder (e) {
  var element = e.target;
  var currImage = $(element).attr("src");

  if (!imageOrder.includes(currImage)) {
    imageOrder.push(currImage)
  }

  if (imageOrder.length == 8) {
    localStorage.setItem("imageOrder", JSON.stringify(imageOrder));
  }
}

// INITIALIZERS

$(document).ready(function () {

  //set image load order
  if (imageOrder in localStorage) {
    var storedImageOrder = JSON.parse(localStorage.getItem("imageOrder"));
  } //else { load default order }

  $(".image").on("click", function (e) {
    trackImageCount(e);
    setImageOrder(e);
  });

});
