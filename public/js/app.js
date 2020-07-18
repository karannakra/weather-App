const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
   const location=search.value
   fetch('/weather?address='+location).then((res)=>{
       res.json().then((data)=>{
           if (data.error){
              console.log(data.error)
           }
           else {
           window.location.replace('/weather2')
               localStorage.setItem('city',data.city)
               localStorage.setItem('country',data.country)
               localStorage.setItem('temperature',data.temperature)
           }
       })
   })
       .catch(err=>{
           console.log('unable to connect')
       })
})
