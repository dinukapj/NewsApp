
var base_url = "http://newsapi.org/v2/everything";
var apiKey = "2494c1e0d447493b83b2df3063774d82";

function load_home() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const qInTitle = "";
    const from = "";
    const apiKey = "2494c1e0d447493b83b2df3063774d82";
    const url = `${proxyUrl}https://newsapi.org/v2/top-headlines?country=au&apiKey=2494c1e0d447493b83b2df3063774d82`;
    const request = new Request(url);

    fetch('https://newsapi.org/v2/top-headlines?country=au&apiKey=2494c1e0d447493b83b2df3063774d82')
        .then(response => response.json())
        .then((news) => {
            for (var articleIndex in news.articles) {
                var article = news.articles[articleIndex];
                appendArticle(article);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

var article_holder = document.getElementById("article_holder");

function appendArticle(article) {
    var container = document.createElement("div");
    container.classList.add("company_listing");
    container.classList.add("isotope-item");
    container.classList.add("high");

    var row = document.createElement("div");
    row.classList.add("row");

    var colmd9 = document.createElement("div");
    colmd9.classList.add("col-md-9");

    var info_box = document.createElement("div");
    info_box.classList.add("company_info");

    var image_container = document.createElement("figure");

    var image_link = document.createElement("a");

    var image = document.createElement("img");
    image.src = article.urlToImage;
    image.classList.add("article_image");

    image_link.appendChild(image);
    image_container.appendChild(image_link);

    var title_link = document.createElement("a");
    title_link.href = article.url;
    title_link.target = "_blank";

    var title = document.createElement("h3");
    title.innerText = article.title;

    title_link.appendChild(title);

    var description = document.createElement("p");
    description.innerText = article.description;

    info_box.appendChild(image_container);
    info_box.appendChild(title_link);
    info_box.appendChild(description);

    colmd9.appendChild(info_box);

    var colmd3 = document.createElement("div");
    colmd3.classList.add("col-md-3");

    var right_container = document.createElement("div");
    right_container.classList.add("text-center");
    right_container.classList.add("float-lg-right");

    var read_more_link = document.createElement("a");
    read_more_link.classList.add("btn_1");
    read_more_link.classList.add("small");
    read_more_link.innerText = "Read more";
    read_more_link.href = article.url;
    read_more_link.target = "_blank";

    right_container.appendChild(read_more_link);

    colmd3.appendChild(right_container);

    row.appendChild(colmd9);
    row.appendChild(colmd3);

    container.appendChild(row);

    article_holder.appendChild(container);
}