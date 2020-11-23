console.log('client side javascript file loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

fetch('http://localhost:3000/weather?address=boston').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data)
        }
        
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')





weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    if(!location){
        messageTwo.textContent = 'please enter address'
    }else{
        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
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

console.log(location)
})