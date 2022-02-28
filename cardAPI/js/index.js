// 1. button event handaler setup
// 2. input value get
// 3. error handleling for string value
// 4. 

const main = document.getElementById('main');


const searchButton = () => {
    const input = document.getElementById('input-value');
    const error = document.getElementById('error');
    const inputValue = input.value;


    if (isNaN(inputValue) || inputValue == '') { // isNaN cheack number or string/ others-true
        // alert('please inter a number');
        error.innerText = 'Please give a number!!';
        input.value = '';
        main.innerHTML = '';
    }
    else if (inputValue <= 0) {
        error.innerText = 'Please give a positive number!!';
        input.value = '';
        main.innerHTML = '';
    }
    else if (inputValue > 52) {
        error.innerText = 'Please give a limited number!!!';
        input.value = '';
        main.innerHTML = '';
    }
    else {
        main.innerHTML = '';

        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
            .then(res => res.json())
            .then(data => cardsDisplay(data.cards))

        input.value = '';
        error.innerHTML = '';
    }
}

const cardsDisplay = (cards) => {
    for (const card of cards) {
        console.log(card);
        const div = document.createElement('div');
        div.classList.add("col-lg-4")
        div.classList.add("col-md-6")
        div.classList.add("col-sm-12")
        div.classList.add("mg-5")
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
                <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${card.suit}</h5>
                <p class="card-text">${card.code}</p>
                <button onclick="cardDetails('${card.code}')" href="#" class="btn btn-primary">See Details</button>
            </div>
        </div>
        `
        main.appendChild(div);
    }
}

const cardDetails = (code) => {
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
        .then(res => res.json())
        .then(data => {
            const allCards = data.cards;
            const singleCard = allCards.find(card => card.code === code)
            const div = document.createElement('div');
            main.innerHTML = '';
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${singleCard.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${singleCard.suit}</h5>
            <p class="card-text">${singleCard.code}</p>
            </div>
            </div>
            `
            main.appendChild(div);
        })
}
