class Toast {
    constructor (data) {
        this.container = data.container
        this.value = data.value
        this.element = null
        this.timeoutId = null
        this.CreateElement()
    }

    CreateElement () {
        this.element = document.createElement('div')
        this.element.classList.add('toast')
        this.element.textContent = this.value
        this.element.addEventListener('click', () => {
            this.Destroy()
        })
    }

    Show () {
        this.container.append(this.element)
        this.timeoutId = setTimeout(() => {
            this.Destroy()
        }, 2000);
    }

    ClearTimeOut () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = null
        }
    }

    Destroy () {
        this.element.remove()
        this.ClearTimeOut()
    }
}

const toastData = {
    container : document.getElementById('toast-container'),
    value : 'hello hello'
}

document.querySelector('.test').addEventListener('click', e => {
    e.preventDefault()
    new Toast(toastData).Show()
})