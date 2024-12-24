initApp()




function initApp() {
    renderGallery()
    setupColorPicker()
    attachEventListeners()

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


// function onKey(ev) {
//     const selectedLineIdx = gMeme.selectedLineIdx
//     if (gMeme.lines[selectedLineIdx]) {
//         gMeme.lines[selectedLineIdx].x = align
//     }

//     switch (ev.key) {
//         case 'ArrowLeft':
//             gMeme.lines[selectedLineIdx].x -= 5
//             break
//         case 'ArrowRight':
//             gMeme.lines[selectedLineIdx].x =

//             break
//         case 'ArrowUp':

//             break
//         case 'ArrowDown':

//             break
//     }






    function handleTextInput(event) {
        const newText = event.target.value
        setLineTxt(newText)

        const img = getCurrentImage();

        if (!img) return;

        renderMeme(img);
    }


    function addTouchListeners() {
        gElCanvas.addEventListener('touchstart', onDown)
        gElCanvas.addEventListener('touchmove', onMove)
        gElCanvas.addEventListener('touchend', onUp)
    }


    function onDown(ev) {
        // Get the ev pos from mouse or touch
        const pos = getEvPos(ev)
        console.log('pos', pos)
        if (!isCircleClicked(pos)) return

        setCircleDrag(true)
        //Save the pos we start from
        gStartPos = pos
        document.body.style.cursor = 'grabbing'
    }




    function onMove(ev) {
        const { isDrag } = getCircle()
        if (!isDrag) return
        console.log('Moving the circle')

        const pos = getEvPos(ev)
        // Calc the delta, the diff we moved
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveCircle(dx, dy)
        // Save the last pos, we remember where we`ve been and move accordingly
        gStartPos = pos
        // The canvas is render again after every move
        renderCanvas()
    }

    function onUp() {
        setCircleDrag(false)
        document.body.style.cursor = 'grab'
    }





    function getCurrentImage() {
        const selectedImgId = getMeme().selectedImgId;

        if (!selectedImgId) return;

        const img = new Image()
        img.src = gImgs.find((img) => img.id === selectedImgId).url;


        return img
    }


    function onDownloadImg(elLink) {
        const imgContent = gElCanvas.toDataURL('image/jpeg')
        elLink.href = imgContent
    }



