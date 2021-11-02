const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
};
'use strict';


function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;


  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector); 

  targetArticle.classList.add('active');
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';


function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for(let article of articles) {

    const articleId = article.getAttribute('id'); 

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;


    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    

    html = html + linkHTML;
    
  } 
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles) {

    const titleList = article.querySelector(optArticleTagsSelector);

    let html = '';

    const articleTags = article.getAttribute('data-tags');

    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){

      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.articleLink(linkHTMLData);

      if(!allTags[tag]){
        allTags[tag] = 1;
      }else {
        allTags[tag]++;
      }
      html += linkHTML + ' ';
    }
    titleList.innerHTML = html;
  }

  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {tags: []};

  for(let tag in allTags) {

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    const tagLinkHtml = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + allTags[tag] + '</a></li>';
    console.log('tagLinkHtml:', tagLinkHtml);
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

function calculateTagsParams(tags){

  const params = {
    max: 0,
    min: 999999,
  };

  for(let tag in tags){

    if(tags[tag] > params.max){
      params.max = tags[tag];
    } else if(tags[tag] < params.min) {
      params.min = tags[tag];
    }
    console.log(tag + 'is used ' + tags[tag] + ' times');
  }
  return params;
}
generateTags();

function calculateTagClass(count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function tagClickHandler(event){

  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  
  for(let activeTag of activeTags) {

    activeTag.classList.remove('active');
  }

  const clickedTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let clickedTag of clickedTags){
    clickedTag.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  const tags = document.querySelectorAll('a[href^="#tag-"]');

  for(let tag of tags){
    tag.addEventListener('click',tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors() {

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles) {

    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const articleAuthors = article.getAttribute('data-author');
    const linkHTMLData = {id: articleAuthors, title: authorsWrapper};
    const linkHTML = templates.articleLink(linkHTMLData);

    html += linkHTML;
    authorsWrapper.innerHTML = html;
  }
}

generateAuthors();



function authorClickHandler(){

  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for(let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  const clickedAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  
  for(let clickedAuthor of clickedAuthors){
    clickedAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors(){
  const authors = document.querySelectorAll('a[href^="#author-"]');

  for(let author of authors) {
    author.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();