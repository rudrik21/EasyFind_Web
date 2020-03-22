var secFood = document.getElementById('food');

setTimeout(() => {
    var req = getRestaurantData();
    req.onerror = function(event) {
        // Handle errors!
    };
    req.onsuccess = function(event) {
        // Do something with the request.result!
        clearRestaurants();
        
        req.result.forEach(function(item){
            // var data = JSON.parse(item);
            addRestaurantCard(document, secFood, JSON.parse(item), true);

            console.log(JSON.parse(item));
        });

        // clearRepeating(secFood);
        // secFood.removeChild(secFood.childNodes[1]);
        
    };    
}, 200);

function clearRestaurants(){
    secFood.innerHTML = "";
}