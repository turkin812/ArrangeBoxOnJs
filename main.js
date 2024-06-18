import ArrangeBox from '/arrangebox.js';


const arrangeBox = new ArrangeBox();

const listBox = [];

const addAvailableElement = arrangeBox.addButtonsDown('Add available element');
const addSelectedElement = arrangeBox.addButtonsDown('Add selected element');
const addArrangeBox = arrangeBox.addButtonsDown('Add new ArrangeBox');
const resultElement = arrangeBox.addButtonsDown('Current values');

document.querySelector('.container').append(addAvailableElement, addSelectedElement, addArrangeBox, resultElement);

addAvailableElement.onclick = function() {
	arrangeBox.addAvailableList(arrangeBox.addIdElement()); 
};

addSelectedElement.onclick = function() {
	arrangeBox.addSelectedList(arrangeBox.addIdElement()); 
};

addArrangeBox.onclick = () => {
	listBox.push(new ArrangeBox()); 
};

resultElement.onclick = function() {
	alert(arrangeBox.getCurrentValues()); 
};
