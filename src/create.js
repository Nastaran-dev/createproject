const btn = document.querySelector('button')
const inp = document.querySelectorAll('input')
const icon = document.querySelectorAll('i')
const spanemail = document.getElementById('spanemail')
const UsernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

 const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;


  const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

function create(e) {

  const formdata = {
    username: inp[0].value,
    email: inp[1].value,
    password: inp[2].value,
  }

  const result = regularexpression(formdata)

  if (!result.isvalid) {
    if (result.errors.username) inp[0].style.borderColor = 'red'
    if (result.errors.email) {
       spanemail.textContent='The email is invalid'
       inp[1].style.borderColor = 'red'
    }
    if (result.errors.password) inp[2].style.borderColor = 'red'
    return
  }

  sendData()
}


function sendData() {
  const gender =
    document.querySelector('input[name="gender"]:checked')?.value || ''

  const newTask = {
    username: inp[0].value,
    email: inp[1].value,
    password: inp[2].value,
    age: inp[3].value,
    gender: gender
  }
  // check your mail exite?
  const url = new URL('https://69536ae3a319a928023b6064.mockapi.io/users');
url.searchParams.append('email', inp[1].value); 

fetch(url, {
  method: 'GET',
  headers: {'content-type':'application/json'},
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(tasks => {
  console.log(tasks);
  if(tasks==undefined){
    // creat task
     fetch('https://69536ae3a319a928023b6064.mockapi.io/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask)
  })
    .then(res => res.json())
    .then(data => {
      console.log('user addd!');
    document.getElementById('container').style.display='none'
      document.getElementById('alert').style.display='flex'
      document.getElementById('alert').classList.add('an')
    })
    .catch(err => console.log(err))
    
     // creat task
  }else{
   document.getElementById('exitebox').style.display='flex'
    
  }
  
}).catch(error => {

})
  // check your mail exite?

 
}
btn.addEventListener('click' , create)

// create a new task
// regex
const span = document.getElementById('spanemail')
function regularexpression(formdata){
    const errors = {}

     if(!formdata.username || !UsernameRegex.test(formdata.username))
       errors.username = "نام کاربری باید بین 3 تا 20 کاراکتر و شامل حروف، اعداد یا آندرلاین باشد.";

     if(!formdata.email || !emailRegex.test(formdata.email))
      errors.email = "ایمیل وارد شده نامعتبر است.";

   
    if(!formdata.password || !PasswordRegex.test(formdata.password))
        errors.password= "رمز عبور باید حداقل 8 کاراکتر شامل حروف بزرگ، کوچک و عدد باشد.";
    // final
    return{
        isvalid : Object.keys(errors).length==0 ,
        errors :errors
    }
}
// regex

// check answer
inp[0].addEventListener('input' , (e)=>{
  if(UsernameRegex.test(e.target.value)){
    icon[0].style.opacity='1'
  }else{
     icon[0].style.opacity='0'
  }
})

inp[1].addEventListener('input' , (e)=>{
  if(emailRegex.test(e.target.value)){
    icon[1].style.opacity='1'
  }else{
    icon[1].style.opacity='0'
    
  }
})

inp[2].addEventListener('input' , (e)=>{
  if(PasswordRegex.test(e.target.value)){
    icon[2].style.opacity='1'
  }else{
    icon[2].style.opacity='0'
  }
})













