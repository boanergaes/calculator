const inputField = document.getElementById('input')
const outPut = document.getElementById('output')

const clrBtn = document.getElementById('clr')
const delBtn = document.getElementById('del')
const eqlBtn = document.getElementById('eql')

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

initStore()

function write(val) {
    let text = outPut.textContent

    if (text == '0') {
        outPut.textContent = val === '-' || !OPERATIONS.has(val) ? val : '0'
        return
    }

    if (OPERATIONS.has(val) && OPERATIONS.has(text[text.length - 1])) {
        if (val === text[text.length - 1] || (text.length === 1 && text[0] === '-')) return

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
    const str = outPut.textContent

    if (OPERATIONS.has(str[str.length - 1])) return
    
    res = eval(str)
    storeLocal(str + ' = ' + res)
    outPut.textContent = res
}

function initStore() {
    let store = localStorage.getItem('calc')
    if (!store) {
        localStorage.setItem('calc', JSON.stringify([]))
    }
}

function storeLocal(str) {
    let store = localStorage.getItem('calc')
    store = JSON.parse(store)
    store.push(str)
    localStorage.setItem('calc', JSON.stringify(store))
}