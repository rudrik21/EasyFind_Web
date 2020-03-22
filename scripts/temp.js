var url = window.location.href;
var data = url.substr(url.lastIndexOf("?json="), url.length).replace("?json=", "");
data = unescape(data);
data = JSON.parse(data);

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

console.log("DATA: ", data);

// Initialize and add the map
function initMap(lat, lng, name) {

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        //  USER LOCATION
        // var pos = {
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude
        // };

        var pos = {
              lat: lat,
              lng: lng
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent(name);
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }


function addImageIntoSlider(url){
    var slider = document.getElementById("slider");
    var sliderDots = document.getElementById("sliderDots");
    var img = document.getElementById('imgSlider').cloneNode(true);
    img.src = url;
    slider.insertBefore(img, sliderDots);
}

function addDotToSlider(i){
    var slider = document.getElementById("slider");
    var sliderDots = document.getElementById("sliderDots");
    var dot = document.getElementById('sliderDot').cloneNode(true);
    dot.onclick = function(){currentDiv(i+1);};
    sliderDots.appendChild(dot);
}

if(data){
    console.log("formatted data", data);
    document.getElementById("title").innerHTML = data.name;
    document.getElementById("restName").innerHTML = data.name;

    makeRequest('GET', getCorsURL(byID(data.id)), [], function (err, res) {
        if (err) { 
          throw err;
        }
      
        res = JSON.parse(res);
        console.log('byID', res);
        
        for(var i = 0; i<res.photos.length; i++){
            var p = res.photos[i];
            addImageIntoSlider(p);
            // addDotToSlider(i);
        };

        initMap(res.coordinates.latitude, res.coordinates.longitude, data.name);

        //  set time
        var time = document.getElementById('time');
        var hours = res.hours[0];
        time.innerHTML += (hours.is_open_now ? "Open" : "Closed") + " now. </br>";

        for(var i = 0; i < hours.open.length; i++){
            var open = hours.open[i];
            time.innerHTML +=  days[open.day] + " : " + insertToStr(open.start, 2, '.') + " - " + insertToStr(open.end, 2, '.') + "</br>";
        };

        //  set rating
        var rating = document.getElementById('rating');
        rating.innerHTML += res.rating + "<br/>";
        
        //  set about
        // var about = document.getElementById('about');
        rating.innerHTML += "🏨 Address : " + res.location.display_address + "</br>";
        rating.innerHTML += "&#128222 Phone : " + res.display_phone + "</br>";
        rating.innerHTML += "👍 Reviews : " + res.review_count + "</br>";

    });
}


function insertToStr(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}