var db;
var dbReq = indexedDB.open('myDatabase', 1);

dbReq.onupgradeneeded = function(event) {
  // Set the db variable to our database so we can use it!  
  db = event.target.result;

  // Create an object store named restaurants. Object stores
  // in databases are where data are stored.
  let rests = db.createObjectStore('restaurants', {autoIncrement: true});
}
dbReq.onsuccess = function(event) {
  db = event.target.result;
}
dbReq.onerror = function(event) {
  alert('error opening database ' + event.target.errorCode);
}

function addRestaurantData(data) {
  // Start a database transaction and get the restaurants object store
  let tx = db.transaction(['restaurants'], 'readwrite');
  let store = tx.objectStore('restaurants');
  // Put the sticky restaurant into the object store
  let rest = data;
  store.add(rest);
  // Wait for the database transaction to complete
  tx.oncomplete = function() { console.log('stored restaurant!') }
  tx.onerror = function(event) {
    alert('error storing restaurant ' + event.target.errorCode);
  }
}

const getRestaurantData = function(){
  var transaction = db.transaction(["restaurants"]);
  var objectStore = transaction.objectStore("restaurants");
  var request = objectStore.getAll();
  return request;
}

const removeRestaurantData = function(key){
  var tx = db.transaction(["restaurants"], 'readwrite');
  var objectStore = tx.objectStore("restaurants");
  objectStore.delete(key);
  tx.oncomplete = function() { console.log('removed restaurant!') }
  tx.onerror = function(event) {
    alert('error removing restaurant ' + event.target.errorCode);
  }
}

const findKey = function(data){
  transaction = this.db.transaction(["restaurants"]);
  object_store = transaction.objectStore("restaurants");
  request = object_store.openCursor();
  return request;
}
