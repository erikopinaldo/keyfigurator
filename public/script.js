// Form init

let form;

function findElements() {
    form = document.querySelector('form');
}

function showMessage(data) {
    alert(data.message);
}

function onSuccess(data) {
    showMessage(data);
}

function onError(data) {
    console.error(data);
}

function collectData(currentForm) {
    // console.log(currentForm)
    // console.log(currentForm.childNodes[5].childNodes[3].value)
    // console.log(currentForm.childNodes[1].childNodes[3].value)
    
    let formBackgroundColor = currentForm.childNodes[1].childNodes[3].value
    let formCaseColor = currentForm.childNodes[3].childNodes[3].value
    let formKeysColor = currentForm.childNodes[5].childNodes[3].value

    let colorObject = {
        backgroundColor: formBackgroundColor,
        caseColor: formCaseColor,
        keysColor: formKeysColor
    }

    // let formData = new FormData(currentForm)
    // console.log(formData)
    // return new FormData(currentForm);
    return colorObject
}

function setOptions(currentForm) {
    console.log(currentForm)
    let formBackgroundColor = currentForm.childNodes[1].childNodes[3].value
    let formCaseColor = currentForm.childNodes[3].childNodes[3].value
    let formKeysColor = currentForm.childNodes[5].childNodes[3].value
    let formName = currentForm.childNodes[7].childNodes[3].value

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
    form.addEventListener('submit', onSubmit);
}

function init() {
    findElements();
    subscribe();
}

init();

const savedColor = document.querySelectorAll('.saved-color')
const deleteBtn = document.querySelectorAll('.deleteBtn')

feather.replace();

Array.from(savedColor).forEach((element) => {
    element.addEventListener('click', selectColor)
})

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteColor)
})

function selectColor(selection) {
    let bgColor = this.childNodes[3].childNodes[1].innerText
    let caseColor = this.childNodes[3].childNodes[3].innerText
    let keysColor = this.childNodes[3].childNodes[5].innerText
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