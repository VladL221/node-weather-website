const weatherForm = document.querySelector('form')
const search = document.querySelector('#search')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    var unit =''
    if(document.querySelector('#m').checked === true){
        unit = 'm'
    }else if(document.querySelector('#s').checked === true){
        unit = 's'
    }else if(document.querySelector('#f').checked === true){
        unit = 'f'
    }
    messageOne.textContent = 'Loading...'
    if(!location){
        messageOne.textContent = 'please enter address'
        messageTwo.textContent = ''
    }else{
        fetch('/weather?address='+location+'&units='+unit).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    messageTwo.textContent = data.error
                    messageOne.textContent =''
                }else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.foreCast
                }
            })
        })
    }

})