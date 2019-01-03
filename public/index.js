var imageCount = {}
var imageOrder = []

function sortImageList(imageCountObj) {
  var imageList = []
  // convert object into array
	for(var key in imageCountObj)
		if(imageCountObj.hasOwnProperty(key))
			imageList.push([key, imageCountObj[key]]);

	// sort items by value
	imageList.sort(function(a, b)
	{
	  return b[1]-a[1]; // compare numbers
	});

  //PUSH IMAGE LIST TO HTML
  $('#imageListByCount').empty();
  var ul = document.createElement('ul');
  document.getElementById('imageListByCount').appendChild(ul);
  imageList.forEach(function (image) {
      var li = document.createElement('li');
      ul.appendChild(li);

      li.innerHTML += image[0];
  });
}

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
  if (localStorage.getItem("imageOrder") !== null) {
    console.log('******here********');
    var storedImageOrder = JSON.parse(localStorage.getItem("imageOrder"));
    console.log(storedImageOrder);
    document.getElementById("image0").src = storedImageOrder[0];
    document.getElementById("image1").src = storedImageOrder[1];
    document.getElementById("image2").src = storedImageOrder[2];
    document.getElementById("image3").src = storedImageOrder[3];
    document.getElementById("image4").src = storedImageOrder[4];
    document.getElementById("image5").src = storedImageOrder[5];
    document.getElementById("image6").src = storedImageOrder[6];
    document.getElementById("image7").src = storedImageOrder[7];
    localStorage.removeItem("imageOrder");
  }

  $(".image").on("click", function (e) {
    trackImageCount(e);
    setImageOrder(e);
  });

});
