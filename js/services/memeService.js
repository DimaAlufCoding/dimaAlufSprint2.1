let gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        { txt: 'Enter meme text', size: 40, color: '#FFFFFF', x: 250, y: 80 }
    ]
}

function getMeme() {
    return gMeme
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

function setLineTxt(txt) {
    const selectedLineIdx = gMeme.selectedLineIdx
    if (gMeme.lines[selectedLineIdx]) {
        gMeme.lines[selectedLineIdx].txt = txt
    }
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}


function setColor(color) {
    const selectedLineIdx = gMeme.selectedLineIdx
    if (gMeme.lines[selectedLineIdx]) {
        gMeme.lines[selectedLineIdx].color = color
    }
}

function setFontSize(delta) {
    const selectedLineIdx = gMeme.selectedLineIdx;
    if (gMeme.lines[selectedLineIdx]) {

        gMeme.lines[selectedLineIdx].size += delta;
        if (gMeme.lines[selectedLineIdx].size < 10) {
            gMeme.lines[selectedLineIdx].size = 10; // Minimum font size
        }
    }
}

function setupTextInput() {
    const textInput = document.getElementById('meme-text')
    textInput.addEventListener('input', (event) => {
        setLineTxt(event.target.value)
        renderMeme(getCurrentImage())
    })
}

function setupColorPicker() {
    const colorPicker = document.getElementById('color-picker')
    colorPicker.addEventListener('input', onChangeColor)
}

function addLine() {
    const newY = gMeme.lines.length === 0 ? 50 : gMeme.lines[gMeme.lines.length - 1].y + 40

    const newLine = {
        txt: 'New Line',
        size: 40,
        color: gMeme.lines.color,
        x: 250,
        y: newY
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    

}


function setText(meme) {
    console.log(gMeme.lines)

    meme.lines.forEach((line, idx) => {
        const fontFamily = line.font || 'Arial'

        gCtx.font = `${line.size}px ${fontFamily}`
        gCtx.fillStyle = line.color
        gCtx.textAlign = "center"
        gCtx.lineWidth = 2
        gCtx.fillText(line.txt, line.x, line.y)
        if (idx === meme.selectedLineIdx) {
            const textWidth = gCtx.measureText(line.txt).width
            const textHeight = line.size

            gCtx.beginPath()
            gCtx.strokeStyle = "grey"

            const boxX = line.x - textWidth / 2 - 5
            const boxY = line.y - textHeight
            const boxWidth = textWidth + 10
            const boxHeight = textHeight + 10

            gCtx.rect(
                boxX,
                boxY,
                boxWidth,
                boxHeight
            )
            gCtx.stroke()
            gCtx.closePath()
        }
    }
    )
}


function removeLine() {
    const selectedLineIdx = gMeme.selectedLineIdx
    if (gMeme.lines[selectedLineIdx]) {
        gMeme.lines.splice(selectedLineIdx, 1)
    }    
}


function setLineAlign(align) {
    const selectedLineIdx = gMeme.selectedLineIdx
    if (gMeme.lines[selectedLineIdx]) {
        gMeme.lines[selectedLineIdx].x = align
    }
}

function setLinePositionX(align) {
    const selectedLineIdx = gMeme.selectedLineIdx
    if (gMeme.lines[selectedLineIdx]) {
        gMeme.lines[selectedLineIdx].x += align
    }
}
function setLinePositionY(align) {
    const selectedLineIdx = gMeme.selectedLineIdx
    if (gMeme.lines[selectedLineIdx]) {
        gMeme.lines[selectedLineIdx].y += align
    }
}


function setFont(font) {
    const selectedLineIdx = gMeme.selectedLineIdx
    if (gMeme.lines[selectedLineIdx]) {
        gMeme.lines[selectedLineIdx].font = font
    }
}


function saveMeme() {
    const originalText = gMeme.lines[0]?.txt
    if (gMeme.lines.length > 0) {
        gMeme.lines[0].txt = 'Saved Meme'
    }
    const imgWithUpdatedText = gElCanvas.toDataURL("image/jpeg");

    if (gMeme.lines.length > 0) {
        gMeme.lines[0].txt = originalText
    }

    let memes = loadFromStorage('memes')
    if (!memes) memes = []
    memes.push(imgWithUpdatedText)
    saveToStorage('memes', memes)
    renderSavedMemes()

}


function clearCanvas() {
    if (!gCtx) return
    gCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}








