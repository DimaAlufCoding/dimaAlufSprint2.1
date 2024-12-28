let gElCanvas
let gCtx
let gCurrColor = "white"
const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 500


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
    renderMeme(getCurrentImage())
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

function onMoveText(align, direction) {
    if (direction === 'x') {
        setLinePositionX(align)
    } else if (direction === 'y') {
        setLinePositionY(align)
    }
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

function onNavigateToGallery(){
    window.location.href = 'big-gallery.html'
}

function onNavigateToMeme(){
    window.location.href = 'index.html'
}













