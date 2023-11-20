const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightbox = document.querySelector(".lightbox");
const closeBtn = lightbox.querySelector(".uil-times");
const downloadImgBtn = lightbox.querySelector(".uil-import");




//API key, pagination, searchTerm variables
const apikey = "r9cuDOtUrsvQiCCXtNmlpIRISbYQjfVmFHeHrQLaHDJNtI7UOV1tUuYr";
const perPage = 15;
let currentPage = 1;
let serachTerm = null;

const downloadImg = (imgURL) => {
    //converting received img to blob, creating its download link, & downloading it
    fetch(imgURL).then(res => res.blob()).then(file => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failes to download image!!"));
}
const showLightbox = (name, img) => {
    // showing lightbox and setting img source, name
    lightbox.querySelector("img").src = img;
    lightbox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

const hideLightbox = () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";

}

const generateHTML = (images) => {
    // making list of all fectch images and adding them to the existing image wrapper
    imagesWrapper.innerHTML += images.map(img =>
        `<li class="card" onclick= "showLightbox('${img.photographer}','${img.src.large2x}')">
        <img src="${img.src.large2x}" alt="img">
        <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button onclick="downloadImg('${img.src.large2x}');event.stopPropagation();">
                    <i class="uil uil-import"></i>
                </button>
        </div>
    </li>`
    ).join("");
}

const getImages = (apiURL) => {
    // fetching images by api call with authorization header
    loadMoreBtn.innerText = "Loading......";
    loadMoreBtn.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: apikey}
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Failes to load images!"));
}

const loadMoreImages = () => {
    currentPage++; // increasing currentPage by 1
    // If searchTerm has some value then call Api with search term else call defaut API
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiURL = serachTerm ? `https://api.pexels.com/v1/search?query=${serachTerm}&page=${currentPage}&per_page=${perPage}` : apiURL;
    getImages(apiURL);
}

const loadSearchImages = (e) => {
    // if the search input is empty, set the search term to numm and return from here
    if(e.target.value === "") return serachTerm = null;
    // if pressed key is enter, update the current page, search term & call the getImages
    if(e.key === "Enter") {
        currentPage = 1;
        serachTerm = e.target.value;
        imagesWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${serachTerm}&page=${currentPage}&per_page=${perPage}`);
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));


