$(document).ready(function(){
  	'use strict';
  	var text;
  	text = document.getElementById('text');
  	text.innerHTML = 'Hello World, document is ready!';
  	text.className = 'green';
  	console.log('Everything is ready.');  
  

  	//-----------------------------------------------------
  	//In case of a derpy old browser
	


});

var myDB = {};
myDB.indexedDB = {};
myDB.indexedDB.db = null;

myDB.indexedDB.open = function(){
	var version = 3;
	var request = indexedDB.open("todos", version);

	request.onupgradeneeded = function(e){
		var db = e.target.result;
		e.target.transaction.onerror = myDB.indexedDB.onerror;

    	if(db.objectStoreNames.contains("todo")) {
      		db.deleteObjectStore("todo");
    	}	

    	var store = db.createObjectStore("todo",
	      {keyPath: "timeStamp"});
	};



	request.onsuccess = function(e){
		myDB.indexedDB.db = e.target.result;
		//do some stuff later 
    	//myDB.indexedDB.getAllTodoItems();
    	console.log("success");

	};
	request.onerror = function(e){
		console.log("could not open myDB")
	}
};
myDB.indexedDB.open();