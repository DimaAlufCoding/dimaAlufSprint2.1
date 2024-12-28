
function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}


function attachEventListeners() {
    const textInput = document.getElementById('meme-text')
    textInput.addEventListener('input', handleTextInput)
    console.log(textInput)
    const canvas = document.getElementById('meme-canvas')
    if (!canvas) return
    canvas.addEventListener('click', onCanvasClick)
}


function onCanvasClick(ev) {
    const meme = getMeme()
    const canvas = document.getElementById('meme-canvas')
    const rect = canvas.getBoundingClientRect()

    console.log('rect', rect)

    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top

    let clickedOnLineIdx = -1

    meme.lines.forEach((line, idx) => {
        const textWidth = gCtx.measureText(line.txt).width
        const textHeight = line.size

        const boxX = line.x - textWidth / 2 - 5
        const boxY = line.y - textHeight
        const boxWidth = textWidth + 10
        const boxHeight = textHeight + 10

        if (
            x >= boxX &&
            x <= boxX + boxWidth &&
            y >= boxY &&
            y <= boxY + boxHeight
        ) {
            clickedOnLineIdx = idx
        }
    })

    if (clickedOnLineIdx >= 0) {
        meme.selectedLineIdx = clickedOnLineIdx
        // onKey(ev)
    } else {
        meme.selectedLineIdx = -1
        console.log('Clicked outside any line')
    }

    renderMeme(getCurrentImage())
}


function handleTextInput(event) {
    const newText = event.target.value
    setLineTxt(newText)
    const img = getCurrentImage();
    if (!img) return;
    renderMeme(img);
}


function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => onImageReady(img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function currentImg(currImg) {
    if (!currImg) return;

    const img = new Image()

    img.src = currImg
    img.onload = () => {
        renderMeme(img)
    }
}