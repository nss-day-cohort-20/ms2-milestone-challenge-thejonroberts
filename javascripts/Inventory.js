// This IIFE will add a new module to Carlot in the namespace of CarLot.Inventory
var CarLot = (function (globalScopeCarLot) {

  // Define a private scope variable to store cars
  let _car_inventory = [];

  // Start building the Object that will be attached to the CarLot.Inventory namespace
  let inventory = Object.create(null);

	//TODO? Move this handler to main.js, since it is the maestro...
  function loadHandler(inventory) {
    //Write Inventory to DOM
  	CarLot.domInventory.buildCarGrid(inventory);
  	//Start event handlers for inventory changes
  	CarLot.domChanges.targetCar();
  };

  inventory.loadInventory = function () {			//TODO: callback??
    var inventoryLoader = new XMLHttpRequest();
    inventoryLoader.addEventListener("load", function () {
      // Add each car to the private _car_inventory array
	    _car_inventory = JSON.parse(event.target.responseText).cars;
	    // Send inventory to DOM
	    loadHandler(_car_inventory);
	    });
    inventoryLoader.open("GET", '/data/inventory.json');
		inventoryLoader.send();
		};

		//QUESTION: Does this sort of compromise the private array storage?
		//Called from handleFormSubmission() in DomManipulation.js
		inventory.changeDescription = function (index, newText) {
			_car_inventory[index].description = newText;
		};

		inventory.getInventory = function() {
			return _car_inventory;
		};

	globalScopeCarLot.Inventory = inventory;
	return globalScopeCarLot;
// If this is the first module that gets evaluated, CarLot will be `undefined` and a new empty object will augmented.
})(CarLot || {});
