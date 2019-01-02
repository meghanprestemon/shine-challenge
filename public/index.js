// RANDOM QUOTE GENERATOR
var quoteData = {}

function setImageOrder () {
    $.getJSON("https://api.forismatic.com/api/1.0/","method=getQuote&lang=en&format=jsonp&jsonp=?", function(data) {
    $(".message").html('"' + data.quoteText + '"');

    if (data.quoteAuthor === "") {
      data.quoteAuthor = "Unknown";
    }
    quoteData = data;
    $(".author").html("- " + data.quoteAuthor);

    $("#getMessage").attr("disabled", false);

  });
}

function trackImageCount () {
  
}

// INITIALIZERS

$(document).ready(function () {

  $(".image").on("click", function () {
    setImageOrder();
    trackImageCount();
  });

  $(".twitter-share-button").on("click", function (e) {
    e.preventDefault();
    var twitterUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(quoteData.quoteText)}" - ${encodeURIComponent(quoteData.quoteAuthor)}&hashtags=quotes`;
    if ((`"${quoteData.quoteText}" - ${quoteData.quoteAuthor} #quotes`).length > 140) {
      var confirm = window.confirm("This quote is over 140 characters! Would you still like to tweet this quote?");
      if (confirm) {
        window.open(twitterUrl);
      }
    } else {
      window.open(twitterUrl);
    }

  });

  getData();

  // YOGA STUDIO LOCATOR
  $('#search-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#search-term').val();
    getPlaces(searchTerm)
    .then(response => response.json())
    .then((places) => {
      createMapMarkers(places);
    })
  });

});
