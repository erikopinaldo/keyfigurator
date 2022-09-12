const deleteBtn = document.querySelectorAll('.deleteBtn')

feather.replace();

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteColor)
})

async function deleteColor() {
    const itemID = this.parentNode.parentNode.parentNode.dataset.id
    console.log(itemID)
    try {
        const response = await fetch('deleteColor', {
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