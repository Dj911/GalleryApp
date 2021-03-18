const uploadFile = document.getElementById('uploadFile');
const formUpload = document.getElementById('formUpload');

const uploadProfileImage = document.getElementById('uploadProfileImage'); //input submit tag
const profileFile = document.getElementById('profileFile');     //input file tag
const userProfile = document.getElementById('userProfileImage');    //img tag

const Nname = document.getElementById('name');
const email = document.getElementById('email');
const mobileNumber = document.getElementById('mobile_number');
const profilDetailsUpdate = document.getElementById('profilDetailsUpdate');



const myFile = document.getElementById('myFile');

const fileUpload = async () => {
    let blob = myFile.files;
    let formData = new FormData();
    let arrFile = [];
    for (const key in blob) {
        formData.append("photo", blob[key])
    }
    const data = await axios.post(`${window.location.origin}/user/addImage/${localStorage.getItem('userid')}`, formData, {
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    });
    alert('Files Uploaded!!')
    window.location = `/gallery/?userid=${localStorage.getItem('userid')}`
}
window.onload = async () => {       // GET PROFILE IMAGE URL
    const uid = localStorage.getItem('userid')
    const data = await axios.get(`${window.location.origin}/user/profileImage/${uid}`, {
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    });
    userProfile.src = data.data.imageUrl
}

const updateProfile = async () => {
    const uid = localStorage.getItem('userid');
    let blob = profileFile.files[0];
    let formData = new FormData();
    let arrFile = [];
    formData.append("photo", blob)
    console.log('BLOB: ', formData);
    const data = await axios.post(`${window.location.origin}/user/updatePicture/${uid}`, formData, {
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    });
    console.log('DATA: ', data.data.imageUrl);
    userProfile.src = data.data.imageUrl
    location.href = `/dashboard/?userid=${localStorage.getItem('userid')}`
}

const updateDetails = async () => {
    const uid = localStorage.getItem('userid');
    console.log('DATA: ', Nname.value,)
    console.log('DATA: ', email.value,)
    console.log('DATA: ', mobileNumber.value)
    const data = await axios.put(`${window.location.origin}/user/updateProfile/${uid}`, {
        "name": Nname.value,
        "email": email.value,
        "mobileNumber": mobileNumber.value,
    }, {
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    });
    alert('Details Updated!');
    location.href = `/dashboard/?userid=${localStorage.getItem('userid')}`

}

// userProfile.addEventListener('load', getProfile)
profilDetailsUpdate.addEventListener('click', updateDetails)        // UPDATE PROFILE DETAILS

uploadProfileImage.addEventListener('click', updateProfile)
uploadFile.addEventListener('click', fileUpload)