
const accessKey = "3dWMouLOZQcYq3vT4US-3cMnosjgtspxHwiFQDcbp40";

const searchForm = document.getElementById("Search-form");
const searchBox = document.getElementById("Search-box");
const searchResult = document.getElementById("Search-result");
const Showmorebtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page ===1){
        searchResult.innerHTML = "";
    }


    const results = data.results;


    results.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;

    const imagelink = document.createElement("a");
    imagelink.href = result.links.html;
    imagelink.target = "_blank";



    imagelink.appendChild(image);
    searchResult.appendChild(imagelink);

    })
    Showmorebtn.style.display = "block";


}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

Showmorebtn.addEventListener("click", ()=>{
    page++;
    searchImages();

})
