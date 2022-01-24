const createCard = (item) => {
  const card = document.createElement("div");
  card.setAttribute("class", "card selected");
  card.setAttribute("id", item.id);
  card.appendChild(createCardBody(item));
  card.appendChild(createCardFooter(item));
  return card;
};
const createCardBody = (item) => {
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card__body");
  const cardContent = document.createElement("div");
  cardContent.innerHTML =
    `
        <h1 class="card__company">${item.company}` +
    (item.new
      ? `<span class="badge badge--blue badge--rounded">NEW!</span>`
      : "") +
    (item.featured
      ? `<span class="badge badge--black badge--rounded">FEATURED</span>`
      : "") +
    `</h1>
        <a href="#" class="card__position">${item.position}</a>
        <p class="card__info">
        <span>${item.postedAt}</span>
        <span>${item.contract}</span>
        <span>${item.location}</span>
        </p>
    `;
  //ADD LOGO TO BODY
  cardBody.innerHTML = `
        <img src="${item.logo}" alt="${item.company}" class="card__logo">
    `;
  //ADD CONTENT TO BODY
  cardBody.appendChild(cardContent);
  return cardBody;
};
const createCardFooter = (item) => {
  const cardFooter = document.createElement("div");
  cardFooter.setAttribute("class", "card__footer");
  const list = document.createElement("ul");
  list.setAttribute("class", "card__footer-list");
  const filterArray = [item.role, item.level, ,...item.languages, ...item.tools];
  filterArray.forEach((filter) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("class", "card__footer-item");
    listItem.innerHTML = `
        <span role="button" class="card__footer-btn">${filter}</span>
        `;
    list.appendChild(listItem);
  });
  cardFooter.appendChild(list);
  return cardFooter;
};

export const getData = async (address, cards) => {
  const response = await fetch(address).then((res) => {
    return res.json();
  });
  await response.forEach(item=>{
    cards.appendChild(createCard(item));
  })
  return response;
};

const isContainsAll = (filterArray,filterList)=>{
  if(filterList.length >0)
  return filterList.every(fi=>{
      return filterArray.indexOf(fi) !== -1;
  })
  else return true;
}

export const showCards = (cards, filterList)=>{
  cards.forEach(card=>{
      const filterArray = []; //For cards own filter items
      card.querySelectorAll('.card__footer-btn').forEach(ci=>{
          filterArray.push(ci.innerHTML);
      })
      const containsAll = isContainsAll(filterArray, filterList);
      if(!containsAll){
          card.classList.remove("selected");
      }
      else card.classList.add("selected");
  })
}

export const setFiltersSection = (filtersSection, filtersContainer, filterList, cards, text) => {
  filtersSection.classList.add('active');
  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('class','filters__btn');
  removeBtn.innerText = text; 
  filtersContainer.appendChild(removeBtn);
  removeBtn.addEventListener('click',()=>{
      removeBtn.remove();
      filterList.splice(filterList.indexOf(text),1);
      if(filterList.length == 0){
          filtersSection.classList.remove('active');
      }
      showCards(cards,filterList);
  });
}