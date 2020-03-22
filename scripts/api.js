const currentPage = location.pathname.split("/").filter(function (c) { return c.length;}).pop();
const baseURL = 'api.yelp.com/v3/';
const auth = 'Authorization';
const bearer = 'Bearer 0bUljKvITfFN82n_YR6koGLevqUMt06irQmZDvG8inmEXfoiMvBDmkiF44RTS7uZyG0Q4q-YI4-8SGU0UQtl0qznB04sTEVuH0JBHIvMhj43lpQ7etbjkelpzc9yXnYx';
const LAT = 43.773293;
const LNG = -79.335884;


/**
 * 
 *      QUERY INITIATORS
 *      BUSINESSES_ BY...
 */

//  get business details by id or proper name of business
const byID = function(id){
    return 'businesses/' + id;
};     //  /{id} => 'north-india-restaurant-san-francisco'  

//  get business details with searchQuery, lat and lng
const bySearch = function(term, lat, lng, offset){
    console.log('SEARCHING TEXT: ', term);
    if(!offset){
        offset = 1;
    }
    if(!lat){
        lat = LAT;
    }
    if(!lng){
        lng = LNG;
    }
    // return 'businesses/search?term=tim&latitude=37.786882&longitude=-122.399972&categories=restaurants';
    return 'businesses/search?term='+term+'&latitude='+lat+'&longitude='+lng+'&categories=restaurants&offset='+offset;
};

//  get all nearby Restaurants
const byCategories = function(lat, lng, categories, offset){
    if(!offset){
        offset = 1;
    }
    if(!lat){
        lat = LAT;
    }
    if(!lng){
        lng = LNG;
    }
    if(categories.length <= 0){
        categories.push('restaurants');
    }
    return 'businesses/search?latitude='+lat+'&longitude='+lng+'&categories='+categories+'&offset='+offset;
};


function getCorsURL(url){
    return 'https://cors-anywhere.herokuapp.com' + '/' + baseURL + url;
}

function makeRequest (method, url, params, done) {
    if (params.length < 0) {
        alert('Empty params');
    }

    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader(auth, bearer);
    xhr.onload = function () {
      done(null, xhr.response);
    };
    xhr.onerror = function () {
      done(xhr.response);
    };
    xhr.send();
  }

/*  *  GET LOCATION     */

var getLocation = function (options) {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);        
    });
}

if(currentPage == 'index.html'){
    getLocation()
        .then((position) => {
        console.log(position);
    })
    .catch((err) => {
        console.error(err.message);
    });
}


// USAGE

// getLocation().then(function(result){
//     console.log('MY Loc: ', result.coords.latitude);
// })


/*  *  USING JS
 
    async function getResponse(url){
        const http = new XMLHttpRequest();
        http.open('GET', getCorsURL(query));
        http.setRequestHeader(auth, bearer);
        http.send(null);
        
        // http.onload = () => {
        //     console.log(http.responseText);
        //     txt.innerHTML = http.responseText;
        // }
        
        return http.onreadystatechange = (e) => {
            console.log(http.responseText)
            txt.innerHTML = http.responseText;
            //   alert(e);
        };
            
    }

*/

/*  *  USING JQUERY

    var req = {
        'url' : getCorsURL(url), 
        'headers' : {'Authorization' : bearer},
        error : function(textStatus, errorThrown){
            console.log('AJAX : error, status = ' + textStatus + ', error = '+ errorThrown);
        }
    }

    $.ajax(req)
        .done(function(response){
            console.log('response = ', response)
        })
*/