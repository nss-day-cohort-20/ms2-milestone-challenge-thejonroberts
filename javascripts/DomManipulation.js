// This IIFE will add a new module to Carlot in thenamespace of CarLot.DomManipulation
var CarLot = (function (globalScopeCarLot) {

	let domChanges = Object.create(null);

	let inputForm = document.getElementById("descriptionForm");
	let inputTextField = document.getElementById("inputTextField");
	let inputButton = document.getElementById("submitButton");
	let currentCar = {};
	let originalText = "";

//test
//
	domChanges.targetCar = function() {
		console.log('targetCar');
		let carBoxes = document.querySelectorAll(".carBox");
		//add listener to select a car to edit
		carBoxes.forEach( function(carBox) {
			// carBox.classList.remove("selectedBorder");
			carBox.addEventListener( "click", function() {
				currentCar = carBox;
				currentCar.classList.add("selectedBorder");
				enableFormInput();
				watchForInputCancel();
				watchForChangeSubmission();
			} );
		});
	};

	function enableFormInput() {
		console.log('enableFormInput');
		inputTextField.disabled = false;
		inputButton.disabled = false;
		inputTextField.value = currentCar.lastChild.innerText;
		inputTextField.focus();
		inputTextField.addEventListener( "keyup", changeDescription, false );
	}

	function disableFormInput() {
		console.log('disableFormInput');
		inputTextField.removeEventListener( "keyup", changeDescription, false );
		inputTextField.blur(); //remove focus from input
		inputTextField.value = "Select a car to edit description";
		inputTextField.disabled = true; //disable input and submit button
		inputButton.disabled = true;
		document.removeEventListener( "focusout", cancelInputChange, false);
	}

	function changeDescription() {
		currentCar.lastChild.innerHTML = inputTextField.value;
	}

	function removeBorders() {
		let carBoxes = document.querySelectorAll(".carBox");
		carBoxes.forEach(function(car) {
			car.classList.remove("selectedBorder");
		});
	}

	function handleChangeSubmission() {
		console.log('handleChangeSubmission');
		document.removeEventListener( "focusout", cancelInputChange, false)
		// CarLot.Inventory.changeDescription(car.id, inputTextField.value);
		removeBorders();
		disableFormInput();
		currentCar = {};
	}

	function watchForChangeSubmission() {
		console.log('watchForChangeSubmission');
		inputForm.addEventListener("submit", handleChangeSubmission, false);
	}

	function watchForInputCancel() {
		console.log('watchForInputCancel');
		originalText = currentCar.lastChild.innerText;
		document.addEventListener( "focusout", cancelInputChange, false);
	}

	function cancelInputChange() {
		console.log('cancelInputChange');
		currentCar.lastChild.innerText= originalText;
		removeBorders();
	}

	globalScopeCarLot.domChanges = domChanges;
	return globalScopeCarLot;

})(CarLot || {});
