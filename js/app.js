const cardContainer = document.getElementById('card-container');


// serach button
const serachButton = () => {
    const input = document.getElementById('input-value')
    const errorMsg = document.getElementById('error')
    const inputValue = parseInt(input.value);
    // search input validation
    if (isNaN(inputValue) || inputValue == '') {
        errorMsg.innerText = 'Please give a number'
        errorMsg.className = 'text-danger' + ' text-center'
        cardContainer.innerHTML = '';
    } else if (inputValue < 0) {
        errorMsg.innerText = 'plesae give a positive number';
        cardContainer.innerHTML = '';

    } else {
        // json respons for serach
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
            .then(res => res.json())
            .then(data => displayCards(data))


        errorMsg.innerText = '';
    }
    input.value = ''

}


// display data when serach
const displayCards = cards => {
    const totalCards = cards.cards;
    cardContainer.innerHTML = '';
    for (const card of totalCards) {
        const div = document.createElement('div');

        // cereate data when serach
        div.innerHTML = `
        <div class="p-3 border bg-light">
        <div class="card">
            <img src="${card.images.png}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${card.value}</h5>
            <p class="card-text">${card.suit}</p>
            <a onclick='getCode("${card.code}")' class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal" type='button'>See Details</a>
            </div>
        </div>
        </div>

        `

        div.className = 'col';
        cardContainer.appendChild(div);

    }
}


// get uniqe code form see details button
const getCode = code => {
    const title = document.getElementById('exampleModalLabel');
    const detailsBody = document.getElementById('card-body');
    title.innerText = ""
    detailsBody.innerHTML = ""

    // 
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
        .then(res => res.json())
        .then(data => {
            const cardAll = data.cards;
            const findUniqCard = cardAll.find(card => card.code == code)
            console.log(findUniqCard);

            title.innerText = `${findUniqCard.value} of ${findUniqCard.suit}`;
            // add inner text in modal see all data
            detailsBody.innerHTML = `
            <p> Card Suit: ${findUniqCard.suit} </p>
            <p>card code: ${findUniqCard.code}</p>
            <h4> Card Value: ${findUniqCard.value} </h4>
            `



        })

}