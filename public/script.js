// Form init

let form;

function findElements() {
    form = document.querySelector('.save-color-form');
}

function onSuccess(data) {
    console.log(data.result);

    let ul = document.querySelector('.saved-colors')
    let li = document.createElement('li')

    li.classList.add('saved-color', 'w-full')
    li.setAttribute('data-id', data.result._id)

    li.innerHTML = `
        <h3 class="text-3xl lg:text-xl">
            ${data.result.colorName}
        </h3>
        <div class="flex justify-between items-center">
            <div class="badge badge-lg rounded-none" style="background-color:${data.result.backgroundColor}">
            </div>
            <div class="badge badge-lg rounded-none" style="background-color:${data.result.caseColor}">
            </div>
            <div class="badge badge-lg rounded-none" style="background-color:${data.result.keysColor}">
            </div>
            <span><button type="button" class="deleteBtn btn btn-secondary btn-lg lg:btn-md">Delete</button></span>
        </div>
    `
    ul.appendChild(li)

    li.addEventListener('click', selectColor)
    li.childNodes[3].childNodes[7].childNodes[0].addEventListener('click', deleteColor)
    
    document.getElementsByClassName('color-picker-name').colorName.value = ''
}

function onError(data) {
    console.error(data);
}

function setOptions(currentForm) {
    let formBackgroundColor = currentForm.childNodes[1].childNodes[3].value
    let formCaseColor = currentForm.childNodes[3].childNodes[3].value
    let formKeysColor = currentForm.childNodes[5].childNodes[3].value
    console.log(currentForm.childNodes[7].childNodes[1].childNodes[1].value)
    let formName = currentForm.childNodes[7].childNodes[1].childNodes[1].value
        // currentForm.childNodes[7].childNodes[3].value

    return {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            'backgroundColor': formBackgroundColor,
            'caseColor': formCaseColor,
            'keysColor': formKeysColor,
            'colorName': formName
        })
    };
}

function sendForm(currentForm) {
    return fetch(currentForm.action, setOptions(currentForm));
}

function onSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    sendForm(currentTarget)
        .then(response => response.json())
        .then(data => onSuccess(data, currentTarget))
        .catch(onError);
}

function subscribe() {
    if (form !== null) {
        form.addEventListener('submit', onSubmit);
    } 
}

function init() {
    findElements();
    subscribe();
}

init();

// Event listeners
const savedColor = document.querySelectorAll('.saved-color')
const deleteBtn = document.querySelectorAll('.deleteBtn')

console.log(document.querySelectorAll('.deleteBtn'))

if (savedColor !== null) {
    Array.from(savedColor).forEach((element) => {
        element.addEventListener('click', selectColor)
    })
}

if (deleteBtn !== null) {
    Array.from(deleteBtn).forEach((element) => {
        element.addEventListener('click', deleteColor)
    })
}

function selectColor(selection) {
    let bgColor = this.childNodes[3].childNodes[1].style.backgroundColor
    let caseColor = this.childNodes[3].childNodes[3].style.backgroundColor
    let keysColor = this.childNodes[3].childNodes[5].style.backgroundColor
    let keys = document.querySelectorAll('.key')

    document.querySelector('.keyboard-container').style.backgroundColor = bgColor
    document.querySelector('.keyboard').style.borderColor = caseColor   
    keys.forEach(key => key.style.backgroundColor = keysColor);
}

async function deleteColor() {
    const itemID = this.parentNode.parentNode.parentNode.dataset.id
    console.log(itemID)
    try {
        const response = await fetch('saved-colors/deleteColor', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemID
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }
    catch(err) {
        console.log(err)
    }
}