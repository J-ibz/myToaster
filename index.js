class Toast {
    /**
     * @param {Object} data - The data to use for creating the toast.
     * @param {HTMLElement} data.container - The container element to append the toast to.
     * @param {string} data.cssToastClass - The CSS classes to add to the toast element.
     * @param {string} data.text - The text to display on the toast.
     * @param {number} [data.duration=3000] - The duration to display the toast for in milliseconds.
     * @param {boolean} [data.validationRequired=false] - Whether or not the toast requires validation before disappearing.
     * @param {ButtonData[]} [data.customsBtns] - An array of objects representing custom buttons to display on the toast.
     */
	constructor(data) {
		this.container = data.container;
		this.text = data.text;
		this.duration = data.duration || 3000;
		this.validationRequired = false || data.validationRequired;
		this.customsBtns = false || data.customsBtns;
		this.element = null;
		this.timeoutId = null;
		this.cssToastClass = data.cssToastClass;
		this.#CreateElement();
	}

    /** Creates the toast element. */
	#CreateElement() {
		this.element = document.createElement('div');
		this.element.classList.add(...this.cssToastClass.split(' '));
		this.element.textContent = this.text;
		if (!this.customsBtns) {
			this.element.addEventListener('click', () => {
				this.#Destroy();
			});
		}
		this.#AddCustomBtns();
	}

    /** Adds custom buttons to the toast element. */
	#AddCustomBtns() {
		if (!this.customsBtns) return;
		const btnsContainer = document.createElement('div');
		btnsContainer.classList.add('btns-container');
		this.customsBtns.forEach((el) => {
			const btnElement = document.createElement(el.type);
			btnElement.classList.add(...el.class.split(' '));
			btnElement.textContent = el.text;
			btnElement.addEventListener('click', (e) => {
				el.callback();
				this.#Destroy();
			});
			btnsContainer.append(btnElement);
		});
		this.element.append(btnsContainer);
	}

    /** Displays the toast in the container and remove it from the DOM after delay. */
	Show() {
		this.container.append(this.element);
		if (!this.validationRequired) {
			this.timeoutId = setTimeout(() => {
				this.#Destroy();
			}, this.duration);
		}
	}

    /** Clears the timeout for hiding the toast. */
	#ClearTimeOut() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
	}
    /** Destroys the toast by removing it from the DOM and clearing the timeout */
	#Destroy() {
		this.element.remove();
		this.#ClearTimeOut();
	}
}

/**
 * @typedef {Object} ButtonData
 * @property {string} type - The type of button to create.
 * @property {string} class - The CSS classes to add to the button.
 * @property {string} text - The text to display on the button.
 * @property {function} callback - The function to call when the button is clicked.
 */

function test() {
	console.log('this is a test');
}

const toastOptions = {
	container: document.getElementById('toast-container'),
	cssToastClass: 'toast flex',
	text: 'hello hello',
	validationRequired: true,
	customsBtns: [
		{
			type: 'div',
			class: 'btn valid',
			text: 'Ok',
			callback: () => {
				console.log('hello');
			},
		},
		{
			type: 'div',
			class: 'btn cancel',
			text: 'Cancel',
			callback: test,
		},
	],
};

const options = {
	container: document.getElementById('toast-container'),
	cssToastClass: 'toast flex',
	text: 'You have been notified',
};

document.querySelector('.test').addEventListener('click', (e) => {
	e.preventDefault();
	new Toast(toastOptions).Show();
});

setInterval(() => {
	new Toast(options).Show();
}, 4000);