class Toast {
	constructor(data) {
		this.container = data.container;
		this.text = data.text;
		this.duration = data.duration || 3000;
        this.validationRequired = false || data.validationRequired;
        this.customsBtns = false || data.customsBtns;
		this.element = null;
		this.timeoutId = null;
        this.cssToastClass = data.cssToastClass
		this.CreateElement();
	}

	CreateElement () {
		this.element = document.createElement('div');
		this.element.classList.add(...this.cssToastClass.split(' '));
		this.element.textContent = this.text;
        if (!this.customsBtns) {
            this.element.addEventListener('click', () => {
            	this.Destroy();
            });
        }
        this.AddCustomBtns()
	}

    AddCustomBtns () {
        if (!this.customsBtns) return
        const btnsContainer = document.createElement('div')
        btnsContainer.classList.add('btns-container')
        this.customsBtns.forEach(el => {
            const btnElement = document.createElement(el.type);
            btnElement.classList.add(...el.class.split(' '));
            btnElement.textContent = el.text;
            btnElement.addEventListener('click', (e) => {
                el.callback()
                this.Destroy()
            })
            btnsContainer.append(btnElement);
        })
        this.element.append(btnsContainer);
    }

	Show () {
		this.container.append(this.element);
        if (!this.validationRequired) {
            this.timeoutId = setTimeout(() => {
                this.Destroy();
            }, this.duration);
        }
	}

	ClearTimeOut () {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
	}

	Destroy () {
		this.element.remove();
		this.ClearTimeOut();
	}
}

function test () {
    console.log('this is a test');
}

const toastOptions = {
	container: document.getElementById('toast-container'),
    cssToastClass : 'toast flex',
	text: 'hello hello',
    validationRequired : true,
    customsBtns : [
        {
            type : 'div', 
            class : 'btn valid',
            text : 'Ok',
            callback : () => {
                console.log('hello');
            } 
        },
        {
            type : 'div',
            class : 'btn cancel',
            text : 'Cancel',
            callback : test
        }
    ]
};

const options = {
	container: document.getElementById('toast-container'),
    cssToastClass : 'toast flex',
	text: 'You have been notified',
};

document.querySelector('.test').addEventListener('click', e => {
	e.preventDefault();
	new Toast(toastOptions).Show();
});

setInterval(() => {
    new Toast(options).Show();
}, 4000);