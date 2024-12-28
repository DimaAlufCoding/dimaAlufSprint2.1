function renderGallery() {
    renderImages()
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderMeme)
}

function renderSavedMemes() {
    const memes = loadFromStorage('memes') || []
    const elMemeGallery = document.querySelector('#meme-gallery')

    if (!memes.length) {
        elMemeGallery.innerHTML = '<p>No memes saved yet.</p>'
        return
    }
    const strHTML = memes.map((memeImg, idx) => {
        return `<img src="${memeImg}" 
                alt="Saved Meme #${idx}" 
                onclick="onLoadMemeFromGallery(${idx})"/>`
    }).join('')

    elMemeGallery.innerHTML = strHTML
}


function onLoadMemeFromGallery(idx) {
    const memes = loadFromStorage('memes') || []

    const memeDataUrl = memes[idx]
    if (!memeDataUrl) return

    gMeme.selectedImgUrl = memeDataUrl

    const img = new Image()
    img.src = memeDataUrl

    img.onload = () => {
        renderMeme(img)
    }
    
}



