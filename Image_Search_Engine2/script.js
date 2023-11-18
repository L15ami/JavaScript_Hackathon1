const apikey = "r9cuDOtUrsvQiCCXtNmlpIRISbYQjfVmFHeHrQLaHDJNtI7UOV1tUuYr";

const perPage = 15;
let currentPage = 1;

const getImages = (apiURL) => {
    // fetching images by API call with authorization header
    fetch (apiURL, {
        headers: {Authorization: apikey}
    }).then(res =>res.json()).then(data => {
        console.log(data);
    })
}

getImages(`https://api.pexels.com/v1/curated?${currentPage}&per_page=${perPage}`);
