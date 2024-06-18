import ListElement from '/listElement.js';
import Control from '/control.js';
import Buttons from '/buttons.js';


export default class ArrangeBox {
	constructor() {
		this.selectedList = [];
		this.availableList = this.setfillRandList(5, 0);

		this.maincontainer = document.querySelector('.container');
		this.boxContainer = document.createElement('div');
		this.boxContainer.classList.add('container-box');
		this.maincontainer.append(this.boxContainer);

		this.availableControl = new Control(this.availableList, 'available', this.boxContainer);
		this.addButtons();
		this.selectedControl = new Control(this.selectedList, 'select', this.boxContainer);
	}

	setfillRandList(count, nowId) {
		const arrayTwo = new Array(Math.floor(1 + Math.random() * 10)).fill();
		const arrayOne = new Array(count).fill();
		const chrs = 'abcdefhkmnpqstwxzABCDEFGHKMNPQRSTWXZ';
		const list = arrayOne.map((currElement, index) => {
			const str = arrayTwo.map(() => chrs[Math.floor(Math.random() * chrs.length)]);
			const price = Math.round(Math.random() * 100);
			return new ListElement(str.join(''), price, index + nowId);
		});
		return list;
	}
	
	addButtons() {
		const buttons = [
			{
				hexCode: 0x2039,
				func: this.moveLeft.bind(this)
			},
			{
				hexCode: 0x203A,
				func: this.moveRight.bind(this)
			},
			{
				hexCode: 0xab,
				func: this.moveAllLeft.bind(this)
			},
			{
				hexCode: 0xbb,
				func: this.moveAllRight.bind(this)
			},
			{
				hexCode: 0x21ba,
				func: this.reset.bind(this)
			}
		];
		const allB = new Buttons(buttons);
		this.boxContainer.append(allB.allButtons);
	}

	addButtonsDown(innerText) {
		const objectButton = document.createElement('div');
		objectButton.classList.add('button-change');
		objectButton.innerText = innerText;
		return objectButton;
	}

	moveRight() {
		const selectedItems = this.availableControl.getSelectedList();
		this.selectedControl.addElementList(selectedItems);
	}

	moveAllRight() {
		const allSearched = this.availableControl.getSearchedList();
		console.log(allSearched);
		this.selectedControl.addElementList(allSearched);
	}

	moveLeft() {
		const selectedItems = this.selectedControl.getSelectedList();
		this.availableControl.addElementList(selectedItems);
	}

	moveAllLeft() {
		const allSearched = this.selectedControl.getSearchedList();
		this.availableControl.addElementList(allSearched);
	}

	addAvailableList(list) {
		this.availableControl.addElementList(list);
	}

	addSelectedList(list) {
		this.selectedControl.addElementList(list);
	}

	reset() {
		
		this.availableControl.setNewList(this.availableList);
		this.selectedControl.setNewList(this.selectedList);
	}

	getCurrentValues() {
		const result = {
			'selected': this.selectedControl.currentValues
		};
		return JSON.stringify(result);
	}

	addIdElement() {
		const selected = Array.from(this.maincontainer.querySelectorAll('.li-container'));
		const nowId = selected.length;
		const newAvailableElement = this.setfillRandList(1, nowId);
		return newAvailableElement;
	}
}