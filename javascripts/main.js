let productArray  = [];

let inventoryRequest = new XMLHttpRequest();

function errorHandler() {
		console.log("An error occured while transfering data");
}

function dataHandler() {
		let productArray = JSON.parse(event.target.responseText);
				console.log('productArray', productArray);
		// productArray.forEach(function(message) {
		// });

}
	inventoryRequest.addEventListener("load", dataHandler);
	inventoryRequest.addEventListener("error", errorHandler);
	inventoryRequest.open("GET", '/data/inventory.json');
	inventoryRequest.send();

