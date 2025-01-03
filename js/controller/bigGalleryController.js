var gImgs = [
    { id: 1, url: "assets/1.jpg", keywords: ["funny", "cat"] },
    { id: 2, url: "assets/2.jpg", keywords: ["nature", "sea"] },
    { id: 3, url: "assets/3.jpg", keywords: ["mountain", "adventure"] },
    { id: 4, url: "assets/4.jpg", keywords: ["mountain", "adventure"] },
    { id: 5, url: "assets/5.jpg", keywords: ["mountain", "adventure"] },
    { id: 6, url: "assets/6.jpg", keywords: ["mountain", "adventure"] },
    { id: 7, url: "assets/7.jpg", keywords: ["mountain", "adventure"] },
    { id: 8, url: "assets/8.jpg", keywords: ["mountain", "adventure"] },
    { id: 9, url: "assets/9.jpg", keywords: ["mountain", "adventure"] },
    { id: 10, url: "assets/10.jpg", keywords: ["mountain", "adventure"] },
    { id: 11, url: "assets/11.jpg", keywords: ["mountain", "adventure"] },
    { id: 12, url: "assets/12.jpg", keywords: ["mountain", "adventure"] },
    { id: 13, url: "assets/13.jpg", keywords: ["mountain", "adventure"] },
    { id: 14, url: "assets/14.jpg", keywords: ["mountain", "adventure"] },
    { id: 15, url: "assets/15.jpg", keywords: ["mountain", "adventure"] },
    { id: 16, url: "assets/16.jpg", keywords: ["mountain", "adventure"] },
    { id: 17, url: "assets/17.jpg", keywords: ["mountain", "adventure"] },
    { id: 18, url: "assets/18.jpg", keywords: ["mountain", "adventure"] },
    { id: 19, url: "assets/19.jpg", keywords: ["mountain", "adventure"] }
]




function renderBigGalleryImg() {
    renderImages()
}



function renderImages() {
    const rowContainer = document.querySelector("#big-gallery")
    rowContainer.innerHTML = "" 

    gImgs.forEach((img) => {
        const image = document.createElement("img")
        image.classList.add("image-gallery")
        image.src = img.url
        image.alt = img.keywords.join(", ")
        image.style.objectFit = "cover"

        image.onclick = () => {
            currentImg(img.url)
            setImg(img.id)
        }

        rowContainer.appendChild(image)
    });
}