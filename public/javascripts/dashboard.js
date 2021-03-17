const uploadFile = document.getElementById('uploadFile');
const formUpload = document.getElementById('formUpload');

const myFile = document.getElementById('myFile');

const fileUpload = async () => {
    let blob = myFile.files;
    console.log('MYFILE: ',myFile)
    console.log('BLOB: ',typeof blob);
    let formData = new FormData();
    let arrFile =[];
    for (const key in blob) {        
        formData.append("photo", blob[key])         
    }
    const data = await axios.post(`${window.location.origin}/user/addImage/${localStorage.getItem('userid')}`, formData, {
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    });
    alert('Files Uploaded!!')
    console.log('DATA: ', data)
}

uploadFile.addEventListener('click', fileUpload)