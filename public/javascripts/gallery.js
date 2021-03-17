const galleryItems = document.getElementById('galleryItems');
const galleryLiItems = document.getElementById('galleryLiItems');
const template = document.getElementById('template');

const addToFav = async (imageId)=>{
    const data = await axios.put(`${window.location.origin}/user/addImage/${localStorage.getItem('userid')}`, {
        imageId: imageId
    }, {
        headers: {
            Authorization: localStorage.getItem('token')
        },
    });
    console.log('DATA: ',data)
}