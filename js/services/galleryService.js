var gImgs = [
    { id: 1, url: "assets/1.jpeg", keywords: ["funny", "cat"] },
    { id: 2, url: "assets/2.jpeg", keywords: ["nature", "sea"] },
    { id: 3, url: "assets/3.jpeg", keywords: ["mountain", "adventure"] },
    { id: 4, url: "assets/4.jpeg", keywords: ["mountain", "adventure"] },
    { id: 5, url: "assets/5.jpg", keywords: ["mountain", "adventure"] },
    { id: 6, url: "assets/6.jpeg", keywords: ["mountain", "adventure"] },
    { id: 7, url: "assets/7.jpeg", keywords: ["mountain", "adventure"] },
    { id: 8, url: "assets/8.jpg", keywords: ["mountain", "adventure"] },
    { id: 9, url: "assets/9.jpeg", keywords: ["mountain", "adventure"] },
    { id: 10, url: "assets/10.jpeg", keywords: ["mountain", "adventure"] },
    { id: 11, url: "assets/11.jpeg", keywords: ["mountain", "adventure"] },
    { id: 12, url: "assets/12.jpeg", keywords: ["mountain", "adventure"] },
    { id: 13, url: "assets/13.jpeg", keywords: ["mountain", "adventure"] },
    { id: 14, url: "assets/14.jpeg", keywords: ["mountain", "adventure"] },
    { id: 15, url: "assets/15.jpeg", keywords: ["mountain", "adventure"] },
    { id: 16, url: "assets/16.jpeg", keywords: ["mountain", "adventure"] },
    { id: 17, url: "assets/17.jpeg", keywords: ["mountain", "adventure"] },
    { id: 18, url: "assets/18.jpg", keywords: ["mountain", "adventure"] },
    { id: 19, url: "assets/19.jpg", keywords: ["mountain", "adventure"] },
    { id: 20, url: "assets/20.jpg", keywords: ["mountain", "adventure"] }
]



function renderImages() {
    const rowContainer = document.querySelector("#gallery")
    rowContainer.innerHTML = ""

    gImgs.forEach((img) => {
        const column = document.createElement("div")
        column.classList.add("column")

        const image = document.createElement("img")
        image.classList.add("demo", "cursor")
        image.src = img.url
        image.alt = img.keywords.join(", ")
        image.style.width = "50px"
        image.style.height = "50px"
        image.style.objectFit = "cover"

        image.onclick = () => {
            currentImg(img.url)
            setImg(img.id)
        }

        column.appendChild(image)
        rowContainer.appendChild(column)
    })
}
