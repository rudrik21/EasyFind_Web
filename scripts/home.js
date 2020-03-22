 var secFood = d.getElementById('food'); 

//  getRestaurantData();
  //  FETCH DATA WHEN HOME PAGE LOADS
  getLocation().then(function(loc, err){
    clearRestaurants();
    makeRequest('GET', getCorsURL(byCategories(loc.coords.latitude, loc.coords.longitude, [], 1)), [], function (err, res) {
      if (err) { 
        throw err;
      }
      
      // txt.innerHTML = res;
      console.log('byCategories', res);
      res = JSON.parse(res);
      res.businesses.forEach(item => {
        console.log(item);
        addRestaurantCard(document, secFood, item);
      });

    });
    }).catch(function(e){
    // txt.innerHTML = e.message;
    // console.log('byCategories', e.message);
    
    makeRequest('GET', getCorsURL(byCategories(null, null, [], null)), [], function (err, res) {
      if (err) { 
        throw err;
      }
      
      console.log('byCategories', res);
      res = JSON.parse(res);
      res.businesses.forEach(item => {
        // console.log(item);
        addRestaurantCard(document, secFood, item, false);
      });
      clearRepeating();
      // txt.innerHTML = res;
    });
    });


    //  FETCH DATA WHEN USER SEARCHES
    
function onSearchRestaurant(){
  clearRestaurants();
  var txt = d.getElementById('txtSearch');
  var str = encodeURIComponent(txt.value);

  getLocation().then(function(loc){
    makeRequest('GET', getCorsURL(bySearch(str, loc.coords.latitude, loc.coords.longitude, null)), [], function (err, res) {
      if (err) { 
        throw err;
      }
      console.log('bySearch', res);
      res = JSON.parse(res);
      res.businesses.forEach(item => {
        console.log(item);
        addRestaurantCard(document, secFood, item, false);
      });
    });
  }).catch(function(e){
    txt.innerHTML = e.message;
  
    makeRequest('GET', getCorsURL(bySearch(str, null, null, null)), [], function (err, res) {
      if (err) { 
        throw err;
      }

      console.log('bySearch', res);
      res = JSON.parse(res);
      res.businesses.forEach(item => {
        console.log(item);
        addRestaurantCard(document, secFood, item, false);
      });
    });
  });

}

function clearRestaurants(){
  secFood.innerHTML = "";
}