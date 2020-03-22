
var txt = document.getElementById('txt');
  
// And we'd call it as such:


//  byID

/*
makeRequest('GET', getCorsURL(byID('north-india-restaurant-san-francisco')), [], function (err, res) {
    if (err) { 
      throw err;
    }
  
    txt.innerHTML = res;
});
*/

//  bySearch

/*
getLocation().then(function(loc){
  makeRequest('GET', getCorsURL(bySearch('coffeeculture', loc.coords.latitude, loc.coords.longitude, null)), [], function (err, res) {
    if (err) { 
      throw err;
    }
  
    txt.innerHTML = res;
  });
}).catch(function(e){
  txt.innerHTML = e.message;

  makeRequest('GET', getCorsURL(bySearch('coffeeculture', null, null, null)), [], function (err, res) {
    if (err) { 
      throw err;
    }
  
    txt.innerHTML = res;
  });
});
*/


//  byCategories

/*
getLocation().then(function(loc, err){
makeRequest('GET', getCorsURL(byCategories(loc.coords.latitude, loc.coords.longitude, [], 2)), [], function (err, res) {
  if (err) { 
    throw err;
  }
  
  txt.innerHTML = res;
});
}).catch(function(e){
txt.innerHTML = e.message;

makeRequest('GET', getCorsURL(byCategories(null, null, [], null)), [], function (err, res) {
  if (err) { 
    throw err;
  }
  
  txt.innerHTML = res;
});
});
*/
