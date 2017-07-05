// This IIFE will add a new module to Carlot in thenamespace of CarLot.DomInventory
var CarLot = (function (globalScopeCarLot) {

	let domModule = Object.create(null);
	let currentRow = document.createElement(null);
	let carCounter = 0;

	function createRow() {
		let DOMcontainer = document.getElementById("DOMcontainer");
		let rowDiv = document.createElement("div");
		let rowID = Math.floor(carCounter / 3) + 1;
		rowDiv.setAttribute("id",`cardRow-${rowID}`);
		rowDiv.setAttribute("class", "row align-items-stretch");
		DOMcontainer.appendChild(rowDiv);
		currentRow = document.getElementById(`cardRow-${rowID}`);
	}

	function buildCarDetails(car) {

		let carBox = document.createElement("div");
		carBox.setAttribute("class", "carBox col-sm-4");
		carBox.setAttribute("id", `${carCounter}`);

		let header = document.createElement("h2");
		header.innerHTML = `${car.year} ${car.make} ${car.model}`;
		carBox.appendChild(header);

		let price = document.createElement("p");
		price.innerHTML = `${car.price}`;
		carBox.appendChild(price);

		let description = document.createElement("p");
		description.innerHTML = `${car.description}`;
		carBox.appendChild(description);

		currentRow.appendChild(carBox);
	}

	domModule.buildCarGrid = function (inventory) {
		createRow();
		inventory.forEach( function(car) {
			buildCarDetails(car);
			carCounter += 1;
		});
	};

	globalScopeCarLot.domInventory = domModule;
	return globalScopeCarLot;

})(CarLot || {});
