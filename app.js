
const btnS = document.querySelectorAll('.btnNum')
const btnOp = document.querySelectorAll('.btnOp')
const clearBtn = document.querySelector('.clearBtn')
const deleteBtn = document.querySelector('.deleteBtn')
const btnPlus = document.querySelector('.btnPlus')
const btnEqual = document.querySelector('.btnEqual')


let textSpan = document.querySelector('.textSpan')
let hiddenTextSpan = document.querySelector('.hiddenTextSpan')

console.log(hiddenTextSpan.classList);


class Calculator {
    constructor (currentCalculationHtmlElement, previousCalculationHtmlElement, ) {
        this.previousCalculationHtmlElement = previousCalculationHtmlElement
        this.currentCalculationHtmlElement = currentCalculationHtmlElement
        this.clear()     
    }

    clear () {
        this.previousCalculation = ''
        this.currentCalculation = ''
        this.operation = undefined
    }

    
    delete () {
        this.currentCalculation = this.currentCalculation.toString().slice(0, -1)
    }

    appendNumberToTheScreen (num) {
        if(num === '.' && this.currentCalculation.includes('.')) return
        if(this.currentCalculation.length === 10) return
        this.currentCalculation = this.currentCalculation.toString() + num.toString()
    }

    chooseOpperation (operation) {
        if (this.currentCalculation === '') return
        if (this.previousCalculation !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousCalculation = this.currentCalculation
        this.currentCalculation = ''
    }


    compute () {
        let computation;
        let current = parseFloat(this.currentCalculation)
        let prev = parseFloat(this.previousCalculation)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentCalculation = computation
        this.operation = undefined
        this.previousCalculation = ''
    }

    getDisplayNumber (number) {
        const toStringNumber = number.toString()
        const integerDigits = parseFloat(toStringNumber.split('.')[0])
        const decimalDigits = toStringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
   


    updateCalculator() {
        this.currentCalculationHtmlElement.innerText = this.getDisplayNumber(this.currentCalculation)
        if (this.operation != null) {
            this.previousCalculationHtmlElement.innerText = `${this.getDisplayNumber(this.previousCalculation)} ${this.operation}`
        } else {
            this.previousCalculationHtmlElement.innerText = ''
        }
    }
}




let calculator = new Calculator(textSpan, hiddenTextSpan)



btnS.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumberToTheScreen(btn.innerText)
        calculator.updateCalculator()
    })
})

btnOp.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOpperation(btn.innerText)
        calculator.updateCalculator()
    })
})
btnEqual.addEventListener('click', () => {
    calculator.compute()
    calculator.updateCalculator()
})
clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateCalculator()
})
deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateCalculator()
})