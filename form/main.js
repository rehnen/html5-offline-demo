/*
 * Place your JS-code here.
 */
/*
if (window.FileReader && window.FileReader.prototype.readAsArrayBuffer) {
    alert('The FileReader APIs are supported');
} else {
    alert('The FileReader readAsArrayBuffer API is not supported');
}*/

var openRequest = indexedDB.open("derp", 3);
var db = {};

// Fixing the file
// http://stackoverflow.com/questions/6181001/manipulating-and-uploading-form-file-data-using-html5-technology


//creating the database
openRequest.onupgradeneeded = function (e) {
	console.log("creating database");
 	//this is where we create the object stores
 	db = e.target.result;

 	var objectStore = db.createObjectStore("meetings", {keyPath: "id", autoIncrement: true});
 	objectStore.createIndex("title", "title", {unique: false});
 	objectStore.createIndex("text", "text", {unique: false});
 	objectStore.createIndex("file", "file", {unique: false});


 }
 openRequest.onsuccess = function(e){
 	db = e.target.result;
 	console.log("success");
 	readFromIndexedDB();

 }
 /*
	Javascript is a nesessary evil
	*/
 //This function gets called if we fail to open the database
 openRequest.onerror = function(e){
 	console.log("openRequest error");
 }

// Save to indexed db
var saveToIndexedDB = function(){
	

 	//Getting the file that is to be uploaded
 	var file = document.getElementById("file").files[0];
 	var fileBin = null;
 	console.log("-----------------");
 	console.log(file);
 	console.log("-----------------");

 	var reader =  new FileReader();
 	reader.onload = function(e){
 		//console.log(this.result);
 		

 	}
 	reader.onloadend = function(){
 		file.arrayBuffer = this.result;

 		var jsonFile = {
 			"name" : file.name,
 			"type" : file.type,
 			"size" : file.size,
 			"location" : reader.result
 		};

 		// console.log("fileBin ---------------- " + fileBin.toString() + "------------");

 		var dataShtuff = {
 			"title": document.getElementById("title").value,
 			"text" : document.getElementById("summary").value,
 			"file" : jsonFile
 		};
 		var transaction = db.transaction(["meetings"], "readwrite");
 		var store = transaction.objectStore("meetings");

 		transaction.oncomplete = function(e){
 			console.log("complete " + e);

 		}
 		transaction.onerror = function(e){
 			console.log("transaction error " + e)
 		}
 		store.put(dataShtuff);


 		var img =document.getElementById("imglel");
 		img.src = reader.result;
 		console.log(reader.result);
 		console.log(file.name);
 	}
 	//var fileAsBin = reader.readAsArrayBuffer(file);
 	var fileAsBin = reader.readAsDataURL(file);

	//Klumpar ihop datan som ska sparas
}
var readFromIndexedDB = function(){
	//cleaning up the table
	var table = document.getElementById("table");
	



	var transaction = db.transaction(["meetings"]);

	var objectStore = transaction.objectStore("meetings");
	var rowClass = "white";
	objectStore.openCursor().onsuccess = function(event){
		var cursor = event.target.result;
		
		if(cursor){
			//console.log("title = " + cursor.value.title + ", text = " + cursor.value.text + ", file = " + cursor.value.file.name + ", contents = " + cursor.value.file.arraybuffer);

			//Table buildning
			//http://viralpatel.net/blogs/dynamically-add-remove-rows-in-html-table-using-javascript/
			var rows = table.rows.length;
			var row = table.insertRow(rows);
			row.className = rowClass;
			cell1 = row.insertCell(0);
			cell1.innerHTML = cursor.value.title;
			cell2 = row.insertCell(1);
			cell2.innerHTML = cursor.value.text;
			cell3 = row.insertCell(2);
			cell3.innerHTML = cursor.value.file.name;


			//The change of classname is just to make the table more readable

			if(rowClass == "white")
				rowClass = "";
			else
				rowClass = "white";

			cursor.continue();
		}else{
			console.log("no more entries");
		}
	}
}
var uploadFromIndexedDB = function(){
	//cleaning up the table
	var table = document.getElementById("table");
	
	var transaction = db.transaction(["meetings"]);

	var objectStore = transaction.objectStore("meetings");
	
	objectStore.openCursor().onsuccess = function(event){
		var cursor = event.target.result;
		
		if(cursor){
			console.log("title = " + cursor.value.title + ", text = " + cursor.value.text + ", file = " + cursor.value.file.name + ", contents = " + cursor.value.file.arraybuffer);
			var formData = new FormData();
			formData.append("title", cursor.value.title);
			formData.append("summary", cursor.value.text);
			formData.append("fileName", cursor.value.file.name);
			formData.append("fileContent", cursor.value.file.location);
			formData.append("fileSize", cursor.value.file.size);
			formData.append("fileType", cursor.value.file.type);
			var ajax = new XMLHttpRequest();
			ajax.addEventListener("load", completeHandler, false);
			ajax.addEventListener("error", errorHandler, false);
			ajax.addEventListener("abort", abortHandler, false);
			ajax.open("POST", "mysql.php");
			ajax.send(formData);


			function completeHandler(event){
				console.log("complere");
				console.log(event);
				cursor.continue();
				
			}

			function errorHandler(event){
				console.log("error");
				
			}

			function abortHandler(event){
				console.log("aborted");
				
			}
			
		}else{
			console.log("no more entries");
		}
	}
}

 //object store has a key



 $(document).ready(function(){ 
 	/*This code is a leftover from a course in javascript that i took in 2012*/

 	'use strict';
 	var text = document.getElementById('text');
 	text.innerHTML = "Det här är bara ett litet exempel";
 	text.class = "";
 	console.log('Everything is ready.');  
 	/*------------------------------------------------------*/ /*------------------------------------------------------*/
 	/*------------------------------------------------------*/ /*------------------------------------------------------*/
 	/*------------------------------------------------------*/ /*------------------------------------------------------*/

 	/*usefull code to follow here, hopefully*/
 	var uploadIndexedDB = $('#uploadIndexedDB');
 	uploadIndexedDB.on('click', function(event){
 		event.preventDefault();
 		uploadFromIndexedDB();
 	});


 	var theForm = $('#form');
 	theForm.on('submit', function(event) {
 		event.preventDefault();
 		console.log("Form: " + theForm.serialize());
 		
 		saveToIndexedDB();
 		

 		/*$.ajax({
 			type:'post',
 			url:'mysql.php',
 			data: theForm.serialize(),
 			dataType: 'json',
 			success: function(data){
 				console.log("Data sent");

 			},
 			error: function(jqXHR, textStatus, errorThrown){
 				console.log('Ajax request failed: ' + textStatus + ', ' + errorThrown);
 			}
 		});*/
 });


 });


/*
	// TODO:
	Uploading the binary data
	Tidy code
	Paste refferences

*/