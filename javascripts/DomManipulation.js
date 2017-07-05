// This IIFE will add a new module to Carlot in thenamespace of CarLot.DomManipulation
var CarLot = (function (globalScopeCarLot) {

	let domChanges = Object.create(null);

	let inputForm = document.getElementById("descriptionForm");
	let inputTextField = document.getElementById("inputTextField");
	let currentCar = {};
	let originalText = "";

	//setup listener for car selection
	domChanges.targetCar = function() {
		let carBoxes = document.querySelectorAll(".carBox");
		carBoxes.forEach( function(carBox) {
			carBox.addEventListener( "click", function() {
				currentCar = carBox;
				currentCar.classList.add("selectedBorder");
				enableFormInput();
				watchForInputCancel();
				watchForChangeSubmission();
			});
		});
	};

	function enableFormInput() {
		inputTextField.disabled = false;
		inputTextField.value = currentCar.lastChild.innerText;
		inputTextField.focus();
		inputTextField.addEventListener( "keyup", changeDescription, false );
	}

	function disableFormInput() {
		inputTextField.removeEventListener( "keyup", changeDescription, false );
		inputTextField.blur();
		inputTextField.value = "Select a car to edit description. Enter key submits changes.";
		inputTextField.disabled = true;
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

	function watchForChangeSubmission() {
		inputForm.addEventListener("submit", handleChangeSubmission, false);
	}
	function handleChangeSubmission() {
		document.removeEventListener( "focusout", cancelInputChange, false);
		//write changes to array QUESTION
		CarLot.Inventory.changeDescription(currentCar.id, inputTextField.value);
		removeBorders();
		disableFormInput();
		currentCar = {};
	}

	function watchForInputCancel() {
		originalText = currentCar.lastChild.innerText;
		document.addEventListener( "focusout", cancelInputChange, false);
	}

	function cancelInputChange() {
		currentCar.lastChild.innerText= originalText;
		removeBorders();
	}

	globalScopeCarLot.domChanges = domChanges;
	return globalScopeCarLot;

})(CarLot || {});
