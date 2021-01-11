const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;//這裏是取得 div.form-control 
  formControl.className = 'form-control error'; //此處呼應css .error的設置
  const small = formControl.querySelector('small'); //為什麼不是document.
  small.innerText = message;
  //message 是下方的參數
}

//show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//The parentElement property returns the parent element of the specified element.獲取物件層次中的父物件
// className:取得或設置指定的class


//check email is valid
//js email regex
//https://ithelp.ithome.com.tw/articles/10094951
//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid')
  }
  //input.value.trim()=>去掉首尾空格


}


// 試著讓語法簡化



//Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      //console.log(input.id);//會顯示input的所有id
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });

}


//check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be at less than ${max} characters`)
  } else {
    showSuccess(input);
  }
}

// check password match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Password do not match')
  }
}


//getFieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  //將第一個字charAt(0)，變大寫，並再接續後面的字slice(1)
}

//event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 5, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
})



//event listener
// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   if (username.value === '') {
//     showError(username, 'Username is required');
//   } else {
//     showSuccess(username);
//   };

//   if (email.value === '') {
//     showError(email, 'Email is required');
//   } else if (!isValiEmail(email.value)) {
//     showError(email, 'Email is not valid');
//   }
//   else {
//     showSuccess(email);
//   };

//   if (password.value === '') {
//     showError(password, 'Password is required');
//   } else {
//     showSuccess(password);
//   };

//   if (password2.value === '') {
//     showError(password2, 'Password 2 is required');
//   } else {
//     showSuccess(password2);
//   };
// })
