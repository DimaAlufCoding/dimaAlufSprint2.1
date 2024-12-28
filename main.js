initApp()

function initApp() {
    initCanvas()
    renderGallery()
    setupColorPicker()
    attachEventListeners()
    renderSavedMemes()
}



function initCanvas() {
    gElCanvas = document.getElementById("meme-canvas")
    gCtx = gElCanvas.getContext("2d")
    gElCanvas.width = CANVAS_WIDTH
    gElCanvas.height = CANVAS_HEIGHT
}



















    

    


