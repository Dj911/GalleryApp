const galleryItems = document.getElementById('galleryItems');
const galleryLiItems = document.getElementById('galleryLiItems');
const template = document.getElementById('template');

async function updateFav(value, task) {
    const data = await axios.put(`${window.location.origin}/user/favImage/${task}/${localStorage.getItem('userid')}`, {
        imageId: value
    }, {
        headers: {
            Authorization: localStorage.getItem('token')
        },
    });
    if (task === 'removeFav') {
        alert('Removed form Favourites!')
        location.href = `/gallery/?userid=${localStorage.getItem('userid')}`

    } else {
        alert('Added to Favourites!')
        location.href = `/favourites/?userid=${localStorage.getItem('userid')}`
    }
}

async function deleteImage(value, task) {
    const data = await axios.put(`${window.location.origin}/user/deleteImage/${localStorage.getItem('userid')}`, {
        imageId: value
    }, {
        headers: {
            Authorization: localStorage.getItem('token')
        },
    });
    alert('Removed form Gallery!')
    location.href = `/gallery/?userid=${localStorage.getItem('userid')}`
}

