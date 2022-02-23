const cardContainer = document.getElementById('card-container');



const serachButton = () => {
    const input = document.getElementById('input-value')
    const errorMsg = document.getElementById('error')
    const inputValue = parseInt(input.value);

    if (isNaN(inputValue) || inputValue == '') {
        errorMsg.innerText = 'Please give a number'
        errorMsg.className = 'text-danger' + ' text-center'
        cardContainer.innerHTML = '';
    } else if (inputValue < 0) {
        errorMsg.innerText = 'plesae give a positive number';
        cardContainer.innerHTML = '';
    } else {
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
            .then(res => res.json())
            .then(data => displayCards(data))


        errorMsg.innerText = '';
    }
    input.value = ''

}

const displayCards = cards => {
    const totalCards = cards.cards;
    cardContainer.innerHTML = '';
    for (const card of totalCards) {
        const div = document.createElement('div');
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

const getCode = code => {



    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
        .then(res => res.json())
        .then(data => {
            const cardAll = data.cards;
            const findUniqCard = cardAll.find(card => card.code == code)
            console.log(findUniqCard);
            const title = document.getElementById('exampleModalLabel');
            title.innerText = `Card Name: ${findUniqCard.suit}`;



        })

}