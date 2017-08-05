/*
  Add respective JS here.
  Please don't target default tags like "h2".
  Instead, target defined tags, ex. "#feature1Heading"
*/


//================== Todo ==================
//Note: could change jQuery to vanilla if that's what we agree on using globally

//Check off specific todos by clicking
$("#todos ul").on("click", "li", function() {
	$(this).toggleClass("completed");
});

// Click on icon to delete todo
$("#todos ul").on("click", "span", function(event) {
	$(this).parent().fadeOut(function() {
		//remove li only once the fadeOut finishes
		$(this).remove;
	});
	//stop the event from bubbling up to other elements
	event.stopPropagation();
});

//Add new todo
$("#todos input[type='text']").keypress(function(event) {
	if (event.which === 13) {
		//make sure text is not empty
		if($(this).val() !== "") {
			//grab new todo text from user input
			var todoText = $(this).val();
			//clear out input field
			$(this).val("");
			//add new li with user input
			$("#todos ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span>" + todoText + " </li>");
		}
	}
});

$("#todos .fa-plus").click(function() {
	$("#todos input").fadeToggle();
});


// Weather
$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(location) {
      var lat = location.coords.latitude;
      var lon = location.coords.longitude;
      var degC = true;
      //Powered by Dark Sky: https://darksky.net/forecast/32,-5/si24/en
      var URL =
        "https://crossorigin.me/https://api.darksky.net/forecast/aa9c777240c7de062ffdd1bbdb29b3ea/" +
        lat +
        "," +
        lon;
      $.getJSON(URL, function(data) {
        var weather = data.currently.summary;
        var temp = data.currently.temperature;
        var ID = data.currently.icon;
        var timezone = data.timezone;

        $("#geoloc").html(timezone);
        $("#temp").html(temp + "°F");
        $("#weather").html("With: " + weather + " weather");
        $("#convertemp").on("click", function() {
          if (degC === true) {
            degC = false;
            $("#temp").html(temp + "\xB0F");
          } else {
            degC = true;
            $("#temp").html(Math.round((temp - 32) / 1.6) + "\xB0C");
          }
        });
      });
    });
  }
});


// Clock
function getTime() {
  // get current date
  const now = new Date();
  // get seconds, minutes and hours
  var seconds = "0" + now.getSeconds();
  var minutes = "0" + now.getMinutes();
  var hours = "0" + now.getHours();

  //change html clock time

  document.getElementById('second').innerHTML = seconds.slice(-2);
  document.getElementById('minute').innerHTML = minutes.slice(-2) + " : ";
  document.getElementById('hour').innerHTML = hours.slice(-2) + " : ";
}

setInterval(getTime, 1000);


// Greet user
var currentHour = new Date().getHours();
var greetMessage = "Good day";

if(currentHour >= 00 && currentHour < 12 ) {
		greetMessage = "Good Morning";
} else if (currentHour >= 12 && currentHour < 17) {
	greetMessage = "Good Afternoon";
} else if (currentHour >= 17 && currentHour < 24) {
	greetMessage = "Good Evening";
}

$("#user").on("keydown",function name(e) {
    if(e.keyCode == 13) {
			var user = this.value;
			$('#name').fadeOut('normal', function() {
				$("#name").css("font-style", "italic");
		    $('#name').html(greetMessage + ", " + user);
		    $('#name').fadeIn('normal');
			});
    }
});

// Quotes
$.ajax({
  type: 'GET',
  url: 'http://quotes.stormconsultancy.co.uk/random.json',
  success: function(resp) {
    $('#quote').html(`"${resp.quote}" ${resp.author}`);
  },
  error: function() {
    console.log('error getting quote');
  }
});

// Motivation button
