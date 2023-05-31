const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const contact = document.getElementById('contact');
const dob = document.getElementById('dob');
const address = document.getElementById('address');
const zipcode = document.getElementById('zipcode');

//Show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success colour
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSucces(input)
    }else {
        showError(input,'Email is not invalid');
    }
}
  //check contact number
  function checkContactNumber(input) {
    const re = /^\d{10}$/; // Assuming the contact number should be 10 digits

    if (re.test(input.value.trim())) {
      showSucces(input);
    } else {
      showError(input, 'Invalid contact number');
    }
  }

//checkRequired fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} is required`)
        }else {
            showSucces(input);
        }
    });
}


//check input Length
function checkLength(input, min ,max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    }else {
        showSucces(input);
    }
}

//get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check passwords match
function checkPasswordMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

function checkDateOfBirth(input) {
  const enteredDate = new Date(input.value);
  const currentDate = new Date();
  const minDate = new Date('1900-01-01'); // Assuming the minimum date of birth allowed is January 1, 1900

  if (isNaN(enteredDate.getTime())) {
    // Invalid date format
    showError(input, 'Invalid date format');
  } else if (enteredDate > currentDate) {
    // Date of birth is in the future
    showError(input, 'Date of birth cannot be in the future');
  } else if (enteredDate < minDate) {
    // Date of birth is before the minimum allowed date
    showError(input, 'Minimum date of birth is January 1, 1900');
  } else {
    // Valid date of birth
    showSucces(input);
  }
}
function validateAddress(input) {
  if (input.value.trim() === '') {
    showError(input, 'Address is required');
  } else {
    showSucces(input);
  }
}

function validateZIPCode(input) {
  const zipPattern = /^\d{5}$/;
  
  if (!zipPattern.test(input.value.trim())) {
    showError(input, 'Invalid ZIP code');
  } else {
    showSucces(input);
  }
}




//Event Listeners
form.addEventListener('submit',function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
    checkContactNumber(contact);
    checkDateOfBirth(dob);
    validateAddress(address);
    validateZIPCode(zipcode);
});