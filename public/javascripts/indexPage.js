
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signupBtn = document.getElementById('signupBtn');
const signinBtn = document.getElementById('signinBtn');

const userName = document.getElementById('name');
const email = document.getElementById('email');
const mobileNumber = document.getElementById('mobileNumber');
const password = document.getElementById('password');
const loginEmail = document.getElementById('loginEmail');
const loginPass = document.getElementById('loginPass');
const signUpForm = document.getElementById('signUpForm');

const alertSigninBox = document.getElementById('alertSignin');
const alertSignupBox = document.getElementById('alertSignup');

const container = document.getElementById('container');

// FUNCTIONS
const signup = async () => {
    axios.post(`${window.location.origin}/user/signup`, {
        name: userName.value,
        mobileNumber: mobileNumber.value,
        email: email.value, //|| adminUsername.value,
        password: password.value //|| adminPassword.value
    }).then(res => {
        alertSigninBox.hidden = false
        console.log('RES: ', res)
        alert('Account Successfully Created! You may now sign in');
    }).catch(err => {
        console.log('ERR: ', err)
        alert(err.message)
        location.href = '/'
    })
}

const signin = async () => {
    const res = await axios.post(`${window.location.origin}/user/login`, {
        email: loginEmail.value, //|| adminUsername.value,
        password: loginPass.value //|| adminPassword.value
    })
    console.log('DATA: ',res.data.data)
    if (res.data.msg === 'Success') {
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('userid', res.data.data._id);
        alert('Login Successful!')
        // location.href = `/dashboard/?userid=${localStorage.getItem('userid')}`;
        location.href = `/notification/?userid=${localStorage.getItem('userid')}`;
    } else {
        console.log(res.data)
    }
}


signUpForm.addEventListener('submit',(el)=>{
    el.preventDefault();
})

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
signupBtn.addEventListener('click', signup)
signinBtn.addEventListener('click', signin)
