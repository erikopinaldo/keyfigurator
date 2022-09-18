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