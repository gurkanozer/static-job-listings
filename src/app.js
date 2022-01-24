import "./style/main.css";
import { showCards, setFiltersSection, getData } from "./js/functions";

const cardsSection = document.querySelector(".cardsSection");
const filterList = [];

getData("../data.json", cardsSection).then(()=>{
    const filterBtns = document.querySelectorAll('.card__footer-btn');
    const cards = document.querySelectorAll('.card');
    const filtersSection = document.querySelector('.filters');
    const filtersContainer = document.querySelector('.filters__container');
    const clearBtn = document.querySelector('.filters__clear');
    filterBtns.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            if(!filterList.includes(btn.innerHTML)){
                filterList.push(btn.innerHTML);
                setFiltersSection(filtersSection, filtersContainer, filterList, cards, btn.innerText);
            }
            showCards(cards,filterList)
        });
    });
    clearBtn.addEventListener('click',()=>{
        filtersSection.classList.remove('active');
        filtersContainer.innerHTML = '';        
        filterList.splice(0,filterList.length);
        showCards(cards,filterList);
    });
});