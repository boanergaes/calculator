const inputField = document.getElementById('input')
const outPut = document.getElementById('output')

const clrBtn = document.getElementById('clr')
const delBtn = document.getElementById('del')
const eqlBtn = document.getElementById('eql')

const percentBtn = document.getElementById('per')
const minusBtn = document.getElementById('mns')
const plusBtn = document.getElementById('pls')
const divBtn = document.getElementById('div')
const multipBtn = document.getElementById('mul')
const decimalBtn = document.getElementById('dec')

const zeroBtn = document.getElementById('zer')
const oneBtn = document.getElementById('one')
const twoBtn = document.getElementById('two')
const threeBtn = document.getElementById('thr')
const fourBtn = document.getElementById('fur')
const fiveBtn = document.getElementById('fiv')
const sixBtn = document.getElementById('six')
const sevenBtn = document.getElementById('sev')
const eightBtn = document.getElementById('eig')
const nineBtn = document.getElementById('nin')

const OPERATIONS = new Set( ['+', '-', '/', '*', '%'] )
const NUMBERS = new Set( ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])

inputField.addEventListener('click', (e) => {
    const content = e.target.textContent
    if (!NUMBERS.union(OPERATIONS).has(content)) return
    write(content)
})

clrBtn.addEventListener('click', clear)

delBtn.addEventListener('click', del)

eqlBtn.addEventListener('click', evaluate)

function write(val) {
    let text = outPut.textContent

    if (text == '0') {
        outPut.textContent = !OPERATIONS.has(val) ? val : '0'
        return
    }

    if (OPERATIONS.has(val) && OPERATIONS.has(text[text.length - 1])) {
        if (val === text[text.length - 1]) return

        outPut.textContent = text.slice(0, text.length - 1) + val
        return
    }

    text += val
    outPut.textContent = text
}

function clear() {
    outPut.textContent = '0'
}

function del() {
    let text = outPut.textContent
    text = text.slice(0, text.length - 1)
    outPut.textContent = text ? text : '0'
}

function evaluate() {
    const PRIORITY = {
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1,
        '%': 1,
    }
    let str = outPut.textContent

    if (OPERATIONS.has(str[str.length - 1])) return

    const segments = []
    let curr = ''
    for (let i = 0; i < str.length; i++) {
        if (OPERATIONS.has(str[i])) {
            segments.push(curr)
            segments.push(str[i])
            curr = ''
            i += 1
        }

        curr += str[i]
    }
    segments.push(curr)

    let nums = []
    let opr = []

    for (n of segments) {
        if (!OPERATIONS.has(n)) {
            nums.push(n)
            continue
        }
        
        while (opr.length !== 0 && PRIORITY[n] <= PRIORITY[opr[opr.length - 1]]) {
            const num1 = parseFloat(nums.pop())
            const num2 = parseFloat(nums.pop())
            const op = opr.pop()

            switch (op) {
                case '+':
                    nums.push(num2 + num1)
                    break
                case '-':
                    nums.push(num2 - num1)
                    break
                case '*':
                    nums.push(num2 * num1)
                    break
                case '/':
                    nums.push(num2 / num1)
                    break
                case '%':
                    nums.push(num2 - num1)
            }
        }
        opr.push(n)
    }

    while (opr.length !== 0) {
        const num1 = parseFloat(nums.pop())
        const num2 = parseFloat(nums.pop())
        const op = opr.pop()

        switch (op) {
            case '+':
                nums.push(num2 + num1)
                break
            case '-':
                nums.push(num2 - num1)
                break
            case '*':
                nums.push(num2 * num1)
                break
            case '/':
                nums.push(num2 / num1)
                break
            case '%':
                nums.push(num2 % num1)
        }
    }

    outPut.textContent = nums[0]
}