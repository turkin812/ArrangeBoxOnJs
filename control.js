import Buttons from '/buttons.js';


export default class Control {
	constructor(listEl, state, commonDiv) {
		this.commonDiv = commonDiv;
		this.state = state;
		this.listElements = [...listEl];
		this.searchedList = [...listEl];
		this.selectedItems = new Set();
		this.visibleList = new Set();
		this.createMain();
		this.changeClassElement();
	}

	createMain() {
		this.controlDiv = document.createElement('div');
		this.controlDiv.classList.add('control-container', this.state);
		this.mainDiv = document.createElement('div');
		this.nameControl = document.createElement('div');
		this.nameControl.classList.add('title');
		const searchCont = document.createElement('div');
		searchCont.classList.add('input-container');
		this.searchInput = document.createElement('input');
		searchCont.append(this.searchInput);

		this.fieldList = document.createElement('ul');
		this.render(this.listElements);
		this.mainDiv = document.createElement('div');
		this.mainDiv.append(this.nameControl, searchCont, this.fieldList);
		this.mainDiv.classList.add('main-container');
		this.addButtons();
		this.controlDiv.append(this.mainDiv);

		this.nameControl.innerText = (this.state === 'select') ? 'Selected' : 'Available';

		this.commonDiv.append(this.controlDiv);
	}

	changeClassElement() {
		this.searchInput.addEventListener('input', () => this.search());
		this.fieldList.addEventListener('click', event => {
			const currentEl = event.target.closest('.li-container');
			if (currentEl) {
				this.selectedItems.add(+currentEl.dataset.id);
				if (!event.ctrlKey) {
					this.selectedItems.forEach(el => {
						this.fieldList.querySelector(`.${this.state} [data-id='${el}']`)
							.classList.remove('selected');
					});
					this.selectedItems.clear();
				}
				this.selectedItems.add(+currentEl.dataset.id);
				currentEl.classList.add('selected');
			}
		});
	}

	search() {
		const searchValue = this.searchInput.value.trim();
		if (/^[a-z]+$/i.test(searchValue) === false) {
			this.searchedList = [...this.listElements];
			for (const value of this.fieldList.children) {
				value.classList.remove('hidden');
			}
			this.visibleList.clear();
		} else {
			const reg = new RegExp(searchValue, 'i');
			this.searchedList = this.listElements.filter((element) => {
				this.selector = this.fieldList.querySelector(`.${this.state} [data-id='${element.id}']`);
				const hideElement = this.selector.parentElement;
				const idElement = + this.fieldList.querySelector(`.${this.state} [data-id='${element.id}']`)
					.dataset.id;
				if (reg.test(element.title)) {
					if (hideElement.classList.contains('hidden') === true) {
						hideElement.classList.toggle('hidden');
						this.visibleList.delete(idElement);
					}
					return true;
				} else {
					hideElement.classList.add('hidden');
					this.visibleList.add(idElement);
				}
				return false;
			});
		}
	}

	addButtons() {
		const buttons = [
			{
				hexCode: 0x2191,
				func: this.moveUp.bind(this)
			},
			{
				hexCode: 0x21c8,
				func: this.moveUpAll.bind(this)
			},
			{
				hexCode: 0x21cA,
				func: this.moveDownAll.bind(this)
			},
			{
				hexCode: 0x2193,
				func: this.moveDown.bind(this)
			}
		];
		const allB = new Buttons(buttons);
		this.controlDiv.append(allB.allButtons);
	}

	setSortedId(option) {
		const sortSelectedItems = Array.from(this.selectedItems);
		sortSelectedItems.sort((a, b) => {
			this.previvous = this.listElements.findIndex((listEl) => listEl.id === a);
			this.next = this.listElements.findIndex((listEl) => listEl.id === b);
			switch (option) {
				case 'ascending':
					return this.previvous - this.next;
				case 'descending':
					return this.next - this.previvous;
				default:
					break;
			}
		});
		return sortSelectedItems;
	}

	moveUp() {
		if (this.selectedItems.size !== 0) {
			const sortSelectedItems = this.setSortedId('ascending');
			let hasChangeable = false;
			sortSelectedItems.forEach(el => {
				const indexFrom = this.listElements.findIndex((listEl) => listEl.id === el);
				const isHidden = this.visibleList.has(el);
				if (indexFrom !== 0 && !isHidden) {
					for (let i = indexFrom - 1; i >= 0; i--) {
						if (!this.visibleList.has(this.listElements[i].id)) {
							this.listElements.splice(i, 0, this.listElements.splice(indexFrom, 1)[0]);
							hasChangeable = true;
							break;
						}
					}
				}
			});
			if (hasChangeable) {
				this.render(this.listElements);
			}
		}
	}

	moveUpAll() {
		if (this.selectedItems.size !== 0) {
			const sortSelectedItems = this.setSortedId('descending');
			let hasChangeable = false;
			sortSelectedItems.forEach(el => {
				const indexFrom = this.listElements.findIndex((listEl) => listEl.id === el);
				const isHidden = this.visibleList.has(el);
				if (indexFrom !== 0 && !isHidden) {
					hasChangeable = true;
					this.listElements.unshift(this.listElements.splice(indexFrom, 1)[0]);
				}
			});
			if (hasChangeable) {
				this.render(this.listElements);
			}
		}
	}

	moveDown() {
		if (this.selectedItems.size !== 0) {
			const sortSelectedItems = this.setSortedId('descending');
			let hasChangeable = false;
			sortSelectedItems.forEach(el => {
				const indexFrom = this.listElements.findIndex((listEl) => listEl.id === el);
				const isHidden = this.visibleList.has(el);
				if (indexFrom !== this.listElements.length && !isHidden) {
					for (let i = indexFrom + 1; i < this.listElements.length; i++) {
						if (!this.visibleList.has(this.listElements[i].id)) {
							this.listElements.splice(i, 0, this.listElements.splice(indexFrom, 1)[0]);
							hasChangeable = true;
							break;
						}
					}
				}
			});
			if (hasChangeable) {
				this.render(this.listElements);
			}
		}
	}

	moveDownAll() {
		if (this.selectedItems.size !== 0) {
			const sortSelectedItems = this.setSortedId('ascending');
			let hasChangeable = false;
			sortSelectedItems.forEach(el => {
				const indexFrom = this.listElements.findIndex((listEl) => listEl.id === el);
				const isHidden = this.visibleList.has(el);
				if (indexFrom !== this.listElements.length - 1 && !isHidden) {
					this.listElements.push(this.listElements.splice(indexFrom, 1)[0]);
					hasChangeable = true;
				}
			});
			if (hasChangeable) {
				this.render(this.listElements);
			}
		}
	}

	render(list) {
		this.fieldList.innerHTML = '';
		list.forEach((element) => {
			const tmpLi = document.createElement('li');
			if (this.visibleList.has(element.id)) {
				tmpLi.classList.add('hidden');
			}
			tmpLi.innerHTML = `<div class='li-container ${(this.selectedItems.has(element.id) ? 'selected ' : '')}'
			data-id='${element.id}'><div class='li-title'>${element.title}
			</div><div class='li-price'>$${element.price}</div></div>`;
			this.fieldList.append(tmpLi);
		});
	}

	getSelectedList() {
		let passedList = [];
		const newList = [];
		if (this.selectedItems.size !== 0) {
			passedList = this.listElements.filter((el) => {
				if (this.selectedItems.has(el.id)) {
					return true;
				}
				newList.push(el);
				return false;
			});
			this.selectedItems.clear();
			this.listElements = newList;
			this.searchedList = newList;
			this.render(this.listElements);
		}
		return passedList;
	}

	getSearchedList() {
		this.selectedItems.clear();
		this.searchedList.forEach(el => {
			const deleteIndex = this.listElements.findIndex((listEl) => listEl.id === el.id);
			this.listElements.splice(deleteIndex, 1);
		});
		this.render(this.listElements);
		const passedList = this.searchedList;
		this.search();
		return passedList;
	}

	addElementList(list) {
		this.listElements.push(...list);
		this.render(this.listElements);
		this.search();
	}

	setNewList(list) {
		this.selectedItems.clear();
		this.listElements = [...list];
		this.render(this.listElements);
		this.search();
	}

	set selectedElements(idElements) {
		this.selectedItems = new Set(idElements);
	}

	get currentValues() {
		return this.listElements;
	}
}