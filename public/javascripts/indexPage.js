
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

const alertSigninBox = document.getElementById('alertSignin');
const alertSignupBox = document.getElementById('alertSignup');

const container = document.getElementById('container');



// FUNCTIONS
const signup = async () => {
    const res = axios.post(`${window.location.origin}/user/signup`, {
        name: userName.value,
        mobileNumber: mobileNumber.value,
        email: email.value, //|| adminUsername.value,
        password: password.value //|| adminPassword.value
    }).then(res => {
        alertSigninBox.hidden = false
        console.log('DATA: ', res)
    }).catch(err => {
        console.log(err)
        // alert(err.message)
    })
}

const signin = async () => {
    const res = await axios.post(`${window.location.origin}/user/login`, {
        email: loginEmail.value, //|| adminUsername.value,
        password: loginPass.value //|| adminPassword.value
    })

    if (res.data.status === 'Success') {
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('userid', res.data.data.userId);
        location.href = "/dashboard";
    } else {
        console.log(res.data)
    }
}




signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
signinBtn.addEventListener('click', signin)
signupBtn.addEventListener('click', signup)