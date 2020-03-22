  d = document;
  var myIndex = 0;
  var x = document.getElementById("se");

  carousel();
  function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 5000); // Change image every 2 seconds
  }


  //  TOGGLE FAVOURITE

  function toggleFav(btn) {
    var data = btn.getAttribute('data');
    console.log('FAV_DATA', data);
    if (!btn.classList.contains('red')){
        //  perform add 
        btn.classList.add('red');
        if (db){
          addRestaurantData(data);
        }
        
    }else{
        //  perform delete
      btn.classList.remove('red');
      
      var req = findKey(data);
      req.onerror = function(event) {
        console.err("error fetching data");
      };
      req.onsuccess = function(event) {
          let cursor = event.target.result;
          if (cursor) {
              let key = cursor.primaryKey;
              let value = cursor.value;
              
              if(value == data){
                removeRestaurantData(key);

                setTimeout(() => {
                  window.location.reload(true);
                }, 100);
                
              }

              cursor.continue();
          }
          else {
              // no more results
          }
      };

    }


  }

  var nav = d.getElementById("mySidenav");
  d.getElementById("txtTitle").onclick = function(){
    scrollToTop();
  }

  var isNavOpen = false;


  function toggleNav(){
    if (!isNavOpen){
      openNav();
    }else{
      closeNav();
    }
  }

  function openNav() {
    isNavOpen = true;
    navIcon.innerHTML = "x";
    nav.style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";

  }

  function closeNav() {
    isNavOpen = false;
    navIcon.innerHTML = "☰";
    nav.style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }


/**
 * Get HTML asynchronously
 * @param  {String}   url      The URL to get HTML from
 * @param  {Function} callback A callback funtion. Pass in "response" variable to use returned HTML.
 */
var getHTML = function ( url, callback ) {

	// Feature detection
	if ( !window.XMLHttpRequest ) return;

	// Create new request
	var xhr = new XMLHttpRequest();

	// Setup callback
	xhr.onload = function() {
		if ( callback && typeof( callback ) === 'function' ) {
			callback( this.responseXML );
		}
	}

	// Get the HTML
	xhr.open( 'GET', url );
	xhr.responseType = 'document';
	xhr.send();

};

// var addRestaurantCard = function(parent, data){
//   getHTML('reusableElements.html', function(res){
//     var card = res.getElementById('cardRestaurant');
//     parent.appendChild(card);
//   });
// }

const TAG = 'commons.js: ';
var addRestaurantCard = function(d, parent, data, isFav){  
  setTimeout(() => {
  
    var card = d.getElementById('cardRestaurant').cloneNode(true);
    var rImage = d.getElementById('rImage');
    var rName = d.getElementById('rName');
    var rAddr = d.getElementById('rAddr');
    var heart = d.getElementById('heart');

    var stars = d.getElementsByClassName('fa fa-star');
    // data = ;
    heart.setAttribute('data', JSON.stringify(data));

    if(isFav){
      heart.classList.add('red');
    }

    // console.log(TAG, data);

    rImage.src = data.image_url;
    rName.innerHTML = data.name;
    // if(data.location){
      rAddr.innerHTML = data.location.display_address;
    // }

    var ratings = parseInt(data.rating);
    for(var i = 0; i< ratings; i++){
      stars[i].classList.add('checked');
    }


    console.log('RNAME: ', data.alias);

    // parent.innerHTML += card.innerHTML;
    parent.appendChild(card);
  
    clearRepeating(parent);

  }, 100);
}

function clearRepeating(secFood){
  if(secFood.childNodes.length > 0){
  secFood.childNodes.forEach(function(child){

    // console.log('childs', child);
    var name = child.querySelector('#rName');
    // console.log('remove', name);
    if (name.innerHTML == 'Sample'){
      secFood.removeChild(child);
    }
  });
}
}


//  onRestaurantClick()

function onRestaurantClick(card){
  var data = card.querySelector('#heart').getAttribute('data');
  var url = window.location.href;
  const filterUrl = url.slice(0,url.lastIndexOf("/")) + '/temp.html';
  window.open(filterUrl + '?json=' + encodeURI(data));
}