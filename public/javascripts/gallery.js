

window.onload = async () => {
    const galleryItems = document.getElementById('galleryItems');
    const galleryLiItems = document.getElementById('galleryLiItems');
    const data = await axios.get(`${window.location.origin}/media/images`, {
        headers: {
            Authorization: localStorage.getItem('token'),
        }
    })
    const res = data.data.data;

    if (data.data.status === 'Success') {
        const node = galleryLiItems.cloneNode(true);
        res.forEach(el => {
            console.log(el.url)
            let url = el.url
            node.innerHTML = `
            <a href="/public/images/fulls/01.jpg"><img src=${el.url} alt=""
									title="This right here is a caption." /></a>`
            console.log(node)
            galleryItems.append(node);
            console.log(galleryItems)
        });
    }
}