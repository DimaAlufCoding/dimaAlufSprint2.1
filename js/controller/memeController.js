let gElCanvas
let gCtx
let gCurrColor = "white"
const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 500

function initCanvas() {
    gElCanvas = document.getElementById("meme-canvas")
    gCtx = gElCanvas.getContext("2d")
    gElCanvas.width = CANVAS_WIDTH
    gElCanvas.height = CANVAS_HEIGHT
}

function renderMeme(img) {
    if (!gElCanvas) initCanvas()
    clearCanvas()

    if (!img) return

    const meme = getMeme()

    const imgRatio = img.naturalWidth / img.naturalHeight
    let renderWidth = CANVAS_WIDTH
    let renderHeight = CANVAS_HEIGHT
    if (imgRatio > 1) {
        renderHeight = CANVAS_WIDTH / imgRatio
    } else {
        renderWidth = CANVAS_HEIGHT * imgRatio
    }
    const offsetX = (CANVAS_WIDTH - renderWidth) / 2
    const offsetY = (CANVAS_HEIGHT - renderHeight) / 2

    gCtx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight)

    const centerX = CANVAS_WIDTH / 2
    const centerY = CANVAS_HEIGHT / 2

    setText(meme, centerX, centerY)

}




function clearCanvas() {

    if (!gCtx) return
    gCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function onChangeColor(event) {
    const selectedColor = event.target.value
    setColor(selectedColor)
    renderMeme(getCurrentImage())
}


function onChangeFontSize(delta) {
    setFontSize(delta)
    renderMeme(getCurrentImage())

}


function onAddLine() {
    addLine()

    const meme = getMeme()
    const textInput = document.getElementById('meme-text')
    textInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function onSwitchLine() {
    const meme = getMeme()
    meme.selectedLineIdx++

    if (meme.selectedLineIdx >= meme.lines.length) {
        meme.selectedLineIdx = 0
    }

    const textInput = document.getElementById('meme-text')
    textInput.value = gMeme.lines[gMeme.selectedLineIdx].txt

    renderMeme(getCurrentImage())
}



function onRemoveLine() {
    removeLine()
    renderMeme(getCurrentImage())
}


function onAlignText(align) {   
    setLineAlign(align)
    renderMeme(getCurrentImage())
}

function onChnageFont(font) {
    setFont(font)
    renderMeme(getCurrentImage())
}


function onSave(){
    const img = gElCanvas.toDataURL("image/jpeg")
    saveMeme(img)
    renderSavedMemes() 


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
                style="width:200px;"
                onclick="onLoadMemeFromGallery(${idx})"/>`
    }).join('')

    elMemeGallery.innerHTML = strHTML
}








