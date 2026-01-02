// eyse minioon
const pwd = document.getElementById('password');
const pupilL = document.getElementById('pupilL');
const pupilR = document.getElementById('pupilR');
const browL = document.getElementById('browL');
const browR = document.getElementById('browR');
const mouth = document.getElementById('mouth');
const popup = document.querySelector('.popup')
const popupinp = document.querySelectorAll('.popupinp')
// setcoookiee
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
// setcoookiee
// getcoookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
// getcoookie
pwd.addEventListener('focus', () => {

  pupilL.setAttribute('cy', '70');
  pupilR.setAttribute('cy', '70');
  browL.setAttribute('y', '45');
  browR.setAttribute('y', '45');
  mouth.setAttribute('d', 'M70 130 Q100 140 130 130');
  pupilR.style.transition='3s'
  pupilL.style.transition='3s'
});

pwd.addEventListener('blur', () => {
  pupilL.setAttribute('cy', '80');
  pupilR.setAttribute('cy', '80');
  browL.setAttribute('y', '55');
  browR.setAttribute('y', '55');
  mouth.setAttribute('d', 'M70 125 Q100 135 130 125');
});
// eyse minion
const inp = document.querySelectorAll('input')
const result = document.querySelectorAll('.result')
let _id = 0
function Mylogin(){
  const email = inp[0].value;
  const password = inp[1].value;
  const rememberCheckbox = document.getElementById("rem"); 
  const shouldRemember = rememberCheckbox.checked;
  
  if (email === '' || password === '') {
     document.getElementById('please').style.display='flex';
     return; 
  }
  
  if (shouldRemember) {
      setCookie("remembered_email", email, 30); 
      setCookie("remember_me_flag", "true", 30); 
  } else {
      setCookie("remembered_email", "", -1);
      setCookie("remember_me_flag", "", -1);
  }

  if(inp[0].value!='' && inp[1].value!=''){
     const url = new URL('https://69536ae3a319a928023b6064.mockapi.io/users');
url.searchParams.append('email', inp[0].value); 
url.searchParams.append('password', inp[1].value); 


fetch(url, {
  method: 'GET',
  headers: {'content-type':'application/json'},
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(tasks => {
 if(tasks==undefined){
  document.getElementById('not').style.display='flex'
   setTimeout(() => {
    document.getElementById('not').style.display='none'
   }, 4000);
    
 }else{
    document.getElementById('box').remove()
    document.getElementById('box2').remove()
    _id=tasks[0].id
    document.getElementById('aleretfinal').style.display='flex'
    result[0].innerHTML=tasks[0].username
    result[1].innerHTML=tasks[0].email
    result[2].innerHTML=tasks[0].password
    result[3].innerHTML=tasks[0].age
    result[4].innerHTML=tasks[0].gender
    
 }
}).catch(error => {
  // handle error
})
  }else{
   document.getElementById('please').style.display='flex'
  }
   
}

function Mydel(){
  
fetch('https://69536ae3a319a928023b6064.mockapi.io/users/' + _id, {
  method: 'DELETE',
}).then(res => {
  if (res.ok) {
      return res.json();
  }
 
}).then(task => {
location.reload()
}).catch(error => {
 
})
}


 function Myedit() {
       document.getElementById('aleretfinal').style.display='none'
        popup.style.display = 'flex'
        ///////////fetch primitive data/////////////////
        fetch('https://69536ae3a319a928023b6064.mockapi.io/users/' + _id).then(res => res.json()).then(data => {
            console.log(data);
            popupinp[0].value = data.username
            popupinp[1].value = data.email
            popupinp[2].value = data.password
            popupinp[3].value = data.age
        })
        ///////////fetch primitive data/////////////////

    }



    function changeUser() {
        const temp = {
            username: popupinp[0].value,
            email: popupinp[1].value,
            password: popupinp[2].value,
            age: popupinp[3].value
        }
        if (
            temp.username != '' &&
            temp.email != '' &&
            temp.password != '' &&
            temp.age != ''
        ) {

            fetch('https://69536ae3a319a928023b6064.mockapi.io/users/' + _id, {
                method: 'PUT', // or PATCH
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(temp)
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
            }).then(task => {
                // Do something with updated tas
                location.reload()
            }).catch(error => {
                // handle error
            })
        } else {
            
        }
    }


    
  const icon = document.getElementById('icon');
if (icon) {
    icon.addEventListener('click', (e) => {
        e.stopPropagation(); 
        popup.style.display = 'none';
        document.getElementById('aleretfinal').style.display = 'flex';
    });
}



document.addEventListener('DOMContentLoaded', (event) => {
   
    const savedEmail = getCookie("remembered_email");
    const rememberFlag = getCookie("remember_me_flag");
    
    const emailInput = inp[0]; 
    const rememberCheckbox = document.getElementById("rem");

    if (savedEmail && rememberFlag === "true") {
  
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    } else if (savedEmail) {
      
        emailInput.value = savedEmail;
        rememberCheckbox.checked = false;
    }
});

// end cookie
