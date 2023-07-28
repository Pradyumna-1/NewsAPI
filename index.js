const API_KEY="6021c30549ac42b9a7b38a1dd5238ca5"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=>fetchNews("India"));

function relode(){
    window.location.reload()
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    bindData(data.articles)
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container')
    const newsCardTemplete = document.getElementById('template-news-card')
    
    cardsContainer.innerHTML ="";

    articles.forEach((article)=> {
        if(!article.urlToImage) return
        const cardClone = newsCardTemplete.content.cloneNode(true);

        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone)
    });
}
function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone: "Asia/Jakarta"
    })

    newSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url, "_blank")
    })
}

let curSelectedNav = null
function onNavItemClick(id){

    fetchNews(id)
    const navItem = document.getElementById(id)
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem
    curSelectedNav.classList.add('active')
}

const searchButton = document.getElementById('search-button')
const seachText = document.getElementById('search-text')

searchButton.addEventListener('click',()=>{
    const query= seachText.value;
    if(!query) return
    fetchNews(query)
    curSelectedNav?.classList.remove('active')
    curSelectedNav = null;
})