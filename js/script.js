'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  //  console.log(event);

  /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

  /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
  /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .post');

    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

  /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
  /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
    const titleList = document.querySelectorAll(optTitleListSelector);
    titleList.innerHTML = '';

  /* for each article */
    const articles = document.querySelectorAll(optTitleListSelector);
    
    let html = '';

    for(let article of articles) {
        article.classList.add('active');
        //let titleList = document.querySelectorAll(optTitleListSelector);
        console.log('dziala');

    /* get the article id */
    const articleId = document.getElementById('article'); 
    /* find the title element */
    const articleTitle = document.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);
    /* insert link into titleList */
    linkHTML.insertAdjecentHTML('beforebegin', titleList.innerHTML);

    html = html + linkHTML;
    console.log('html');
    } 

    titleList.innerHTML = html;
}

generateTitleLinks();