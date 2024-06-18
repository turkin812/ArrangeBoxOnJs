export default class Buttons {
	constructor(buttons) {
		this.containerButton = document.createElement('div');
		this.containerButton.classList.add('button-container');
		buttons.forEach(element => {
			const tmp = document.createElement('button');
			tmp.innerText = String.fromCharCode(element.hexCode);
			tmp.addEventListener('click', element.func);
			this.containerButton.append(tmp);
		});
	}

	get allButtons() {
		return this.containerButton;
	}
}