let gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        { txt: 'Default text', size: 40, color: '#FFFFFF', x: 250, y: 80 }
    ]
}

function getMeme() {
    return gMeme
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
    renderMeme(getCurrentImage())

}



function setText(meme) {
    console.log(gMeme.lines)

    meme.lines.forEach((line, idx) => {
        const fontFamily = line.font || 'Arial'

        gCtx.font = `${line.size}px ${fontFamily}`
        gCtx.fillStyle = line.color
        gCtx.textAlign = "center"
        // gCtx.strokeStyle = "red"
        gCtx.lineWidth = 2

        gCtx.fillText(line.txt, line.x, line.y)
        // gCtx.strokeText(line.txt, line.x, line.y)


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
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}


function setLineAlign(align) {
    const selectedLineIdx = gMeme.selectedLineIdx
    if (gMeme.lines[selectedLineIdx]) {
        gMeme.lines[selectedLineIdx].x = align
    }
}

function setFont(font) {
    const selectedLineIdx = gMeme.selectedLineIdx
    if (gMeme.lines[selectedLineIdx]) {
        gMeme.lines[selectedLineIdx].font = font
    }
}


function saveMeme(img) {

    let memes = loadFromStorage('memes')
    if (!memes) memes = []
    memes.push(img)
    saveToStorage('memes', memes)

}





function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))

}

function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : null
}




