
const state = {};





// const fetchAsyncA = async () => await (await fetch('https://api.github.com')).json()
// https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808

const playWar = async () => {
    try{
        const result = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await result.json();
        state.deck_id = data.deck_id;
    
        

        //this is an array of 5 
        const playerOne = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/draw/?count=${52/2}`)).json();
      
        
        const playerTwo= await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/draw/?count=${52/2}`)).json();
       
    //     const carArray = ["AS","2S","KS","QS"];
    //     const piles = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${'funny'}/add/?cards=${carArray.toString()}`)).json();
    //     console.log(piles);
    //     const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${'funny'}/shuffle/`)).json();
    //     console.log(pilesShuffle);

        
    //     const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${'funny'}/list/`)).json();
    //    const pilesDraw =  await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${'funny'}/draw/?count=4`)).json();
    //     console.log(pilesDraw.cards);
        
        
        state.playerOneDeck = playerOne.cards;
       
 
        state.playerTwoDeck = playerTwo.cards;
    

    

        //https://stackoverflow.com/questions/33846682/react-onclic,k-function-fires-on-render/33846747
        //Because you are calling that function instead of passing the function to onClick, change that line to this:

        
        const renderCard = (card, playerNumber) =>{
            
            const displayCard = `<img class = "card--${playerNumber}" src = ${card.image} alt = ${card.code}/>`;

            // const cardIndex = (playerNumber*10)+index+1;

            document.querySelector(`.players-card__player-${playerNumber}`).insertAdjacentHTML('beforeend',displayCard);

            //https://dev.to/karataev/set-css-styles-with-javascript-3nl5
            let style = document.createElement('style');
            style.innerHTML = `
            .players-card__card {
            background-color: green;
            }
            `;
            document.head.appendChild(style);
            //passed down the cards array from json, cardindex that is relevant to changing the card, and player number
            // renderNewCard(cards,index, playerNumber);

        };


        state.playerOnePile = [];

        state.playerTwoPile = [];

        const cardNumber = (cardCode) =>{
            const splitCardCode= cardCode.split("");
            const cardNumTemp= splitCardCode[0];
            if (cardNumTemp === "A"){
                return 14;
            } else if (cardNumTemp === "K"){
                return 13;
            } else if (cardNumTemp === "Q"){
                return 12;
            } else if (cardNumTemp === "J"){
                return 11;
            } else if (cardNumTemp === "0"){
                return 10;
            } else {
                return cardNumTemp;
            }

              
        };


        // const compareCards = (playerOneCard,playerTwoCard) => {
        //     const cardPot = [];
        //     cardPot.push(playerOneCard,playerTwoCard);
        //     if (cardNumber(playerOneCard) > cardNumber(playerTwoCard)){
        //         state.playerOnePile = state.playerOnePile.concat(cardPot);//add card won onto pile for future use in deck api
        //         state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
        //         state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost
        //     } else if (cardNumber(playerTwoCard) > cardNumber(playerOneCard)){
        //         state.playerTwoPile = state.playerTwoPile.concat(cardPot);//add card won onto pile for future use in deck api
        //         state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
        //         state.playerOneDeck.splice(0,cardPot.length/2);
        //     } else if (cardNumber(playerOneCard) === cardNumber(playerTwoCard)){

        //     }
        // };

        const equalCardDuel = (cardPot) =>{
            let card1 = cardNumber(state.playerOneDeck[0].code) ;
            let card2 = cardNumber(state.playerTwoDeck[0].code);
            let odd = 1;
            let even =2
    
            while(card1 === card2){
                setTimeout(renderCard(state.playerOneDeck[odd], 1),10000);
                setTimeout(renderCard(state.playerTwoDeck[odd], 2),10000);
                cardPot.push(state.playerOneDeck[odd].code,state.playerTwoDeck[odd].code);
                //cardPot.push(state.playerOneDeck[odd],state.playerTwoDeck[odd]);
    
                setTimeout(renderCard(state.playerOneDeck[even], 1),10000);
                setTimeout(renderCard(state.playerTwoDeck[even], 2),10000);
                cardPot.push(state.playerOneDeck[even].code,state.playerTwoDeck[even].code);
                //cardPot.push(state.playerOneDeck[even],state.playerTwoDeck[even]);
    
                if (cardNumber(state.playerOneDeck[even].code) > cardNumber(state.playerTwoDeck[even].code)){
                    state.playerOnePile = state.playerOnePile.concat(cardPot);//add card won onto pile for future use in deck api
                    //state.playerOneDeck = state.playerOneDeck.concat(cardPot);//add card won onto pile for future use in deck api
                    state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
                    state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost
                    break
                } else if (cardNumber(state.playerTwoDeck[even].code) > cardNumber(state.playerOneDeck[even].code)){
                    state.playerTwoPile = state.playerTwoPile.concat(cardPot);//add card won onto pile for future use in deck api
                    //state.playerTwoDeck = state.playerTwoDeck.concat(cardPot);//add card won onto pile for future use in deck api
                    state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
                    state.playerOneDeck.splice(0,cardPot.length/2);
                    break
                } else if (cardNumber(state.playerOneDeck[even].code) === cardNumber(state.playerTwoDeck[even].code)){
                    card1 = cardNumber(state.playerOneDeck[even].code); 
                    card2 = cardNumber(state.playerTwoDeck[even].code);
                    odd = odd + 2;
                    even = even + 2;
                }
            }
            
        }



        const dummy = async () =>{

            
            renderCard(state.playerOneDeck[0], 1);
            renderCard(state.playerTwoDeck[0], 2);
    



            let style = document.createElement('style');
            style.innerHTML = `
        
            `;
            document.head.appendChild(style);

            const cardPot = [];
            cardPot.push(state.playerOneDeck[0].code,state.playerTwoDeck[0].code);
            //cardPot.push(state.playerOneDeck[0],state.playerTwoDeck[0]);
            

            if (cardNumber(state.playerOneDeck[0].code) > cardNumber(state.playerTwoDeck[0].code)){
                state.playerOnePile = state.playerOnePile.concat(cardPot);//add card won onto pile for future use in deck api
                //state.playerOneDeck = state.playerOneDeck.concat(cardPot);//add card won onto pile for future use in deck api
                state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
                state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost
            } else if (cardNumber(state.playerTwoDeck[0].code) > cardNumber(state.playerOneDeck[0].code)){
                state.playerTwoPile = state.playerTwoPile.concat(cardPot);//add card won onto pile for future use in deck api
                //state.playerTwoDeck = state.playerTwoDeck.concat(cardPot);//add card won onto pile for future use in deck api
                state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
                state.playerOneDeck.splice(0,cardPot.length/2);
            } else if (cardNumber(state.playerOneDeck[0].code) === cardNumber(state.playerTwoDeck[0].code)){
                //deal with end case where you have less then 3 cards but happen to draw same card on card number 2
                if (state.playerOneDeck.length + state.playerOnePile.length < 3){
                    let style = document.createElement('style');
                    style.innerHTML = `
                    .winner h1{
                        display:block;
                    }
                `;
                document.head.appendChild(style);
                document.querySelector(".war__button").disabled = true;
                document.querySelector('.winner__header').innerHTML = "Player Two won!"
                    //deal with end case where you have less then 3 cards but happen to draw same card on card number 2
                } else if (state.playerTwoDeck.length + state.playerTwoPile.length < 3) {
                    let style = document.createElement('style');
                    style.innerHTML = `
                        .winner h1{
                            display:block;
                        }
                    `;
                    document.head.appendChild(style);
                    document.querySelector(".war__button").disabled = true;
                    document.querySelector('.winner__header').innerHTML = "Player One won!" 
                //edge case when you happen to draw equal card on card number 1 but don't have enough card in deck but enough in pile
                } else if (state.playerOneDeck.length < 3 && state.playerOnePile.length > 3) {
                    
                    document.querySelector(`.war__button`).disabled = true;

                    const playerOneDeck = 'playerOneDeck';

                    const piles = await( await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/add/?cards=${state.playerOnePile.toString()}`) ).json();
                    const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/shuffle/`)).json();
                
                    const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/list/`)).json();
                    console.log(pilesList);
                    const pilesDraw = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/draw/?count=${state.playerOnePile.length }`)).json();
                    console.log(pilesDraw);
                    state.playerOneDeck = state.playerOneDeck.concat(pilesDraw.cards);

                    //  state.playerOneDeck = [...state.playerOneDeck, ...pilesDraw.cards]
                    state.playerOnePile=[];
                    console.log(state.playerOneDeck);
                    console.log(state.playerOnePile);

                    document.querySelector(`.war__button`).disabled = false;

                    equalCardDuel(cardPot);
                    

                } else if(state.playerTwoDeck.length < 3 && state.playerTwoPile.length > 3) {
                    
                    document.querySelector(`.war__button`).disabled = true;
                    const playerTwoDeck = 'playerTwoDeck';
                    const piles = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/add/?cards=${state.playerTwoPile.toString()}`)).json();
                    
                    const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/shuffle/`)).json();
             
                    const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/list/`)).json();
                    console.log(pilesList);
                    const pilesDraw = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/draw/?count=${state.playerTwoPile.length}`)).json();
                    console.log(pilesDraw);
                    state.playerTwoDeck = state.playerTwoDeck.concat(pilesDraw.cards);
    
                    // state.playerTwoDeck = [...state.playerTwoDeck, ...pilesDraw.cards];
                    state.playerTwoPile=[];
                    
                    console.log(state.playerTwoDeck);
                    console.log(state.playerTwoPile);
    
                    document.querySelector(`.war__button`).disabled = false;

                    equalCardDuel(cardPot);
                } else {
                    equalCardDuel(cardPot);
                }
            }

            console.log(state.playerOneDeck);
            console.log(state.playerOnePile);
            console.log(state.playerTwoDeck);
            console.log(state.playerTwoPile);

           

            document.querySelector('.card-count__player-1').innerHTML = `${state.playerOneDeck.length + state.playerOnePile.length } in the deck`;
            document.querySelector('.card-count__player-2').innerHTML = `${state.playerTwoDeck.length + state.playerTwoPile.length } in the deck`;

            //document.querySelector('.card-count__player-1').innerHTML = `${state.playerOneDeck.length } in the deck`;
            //document.querySelector('.card-count__player-2').innerHTML = `${state.playerTwoDeck.length } in the deck`;

            //pileToDeck();
        };

        const pileToDeck = async () => {
            if (state.playerOneDeck.length === 0){

                document.querySelector(`.war__button`).disabled = true;

                const playerOneDeck = 'playerOneDeck';

                const piles = await( await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/add/?cards=${state.playerOnePile.toString()}`) ).json();
                const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/shuffle/`)).json();
              
                const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/list/`)).json();
               console.log(pilesList);
               const pilesDraw = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/draw/?count=${state.playerOnePile.length }`)).json();
                console.log(pilesDraw);
                state.playerOneDeck = state.playerOneDeck.concat(pilesDraw.cards);

                //  state.playerOneDeck = [...state.playerOneDeck, ...pilesDraw.cards]
                state.playerOnePile=[];
                console.log(state.playerOneDeck);
                console.log(state.playerOnePile);

                document.querySelector(`.war__button`).disabled = false;
                
            } 
            
            if (state.playerTwoDeck.length === 0){

                document.querySelector(`.war__button`).disabled = true;
                const playerTwoDeck = 'playerTwoDeck';
                const piles = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/add/?cards=${state.playerTwoPile.toString()}`)).json();
                
                const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/shuffle/`)).json();
         
                const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/list/`)).json();
                console.log(pilesList);
                const pilesDraw = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/draw/?count=${state.playerTwoPile.length}`)).json();
                console.log(pilesDraw);
                state.playerTwoDeck = state.playerTwoDeck.concat(pilesDraw.cards);

                // state.playerTwoDeck = [...state.playerTwoDeck, ...pilesDraw.cards];
                state.playerTwoPile=[];
                
                console.log(state.playerTwoDeck);
                console.log(state.playerTwoPile);

                document.querySelector(`.war__button`).disabled = false;
            } 

        };


        const winnerLog = () =>{
            if (state.playerOneDeck.length + state.playerOnePile.length === 0 ){
                let style = document.createElement('style');
                style.innerHTML = `
                    .winner h1{
                        display:block;
                    }
                `;
                document.head.appendChild(style);
              

                document.querySelector('.winner__header').innerHTML = "Player Two won!"
                document.querySelector(`.war__button`).disabled = true;

            } else if (state.playerTwoDeck.length + state.playerTwoPile.length === 0 ){
                let style = document.createElement('style');
                style.innerHTML = `
                    .winner h1{
                        display:block;
                    }
                `;
                document.head.appendChild(style);
                
                document.querySelector('.winner__header').innerHTML = "Player One won!" 
                document.querySelector(`.war__button`).disabled = true;
            }
        }
        
        document.querySelector(`.war__button`).addEventListener('click', () =>{
            //i only did this to trigger the if function
            let el1 = document.querySelector(`.card--1`);
            let el2 = document.querySelector(`.card--2`);

            if (el1 && el2){
                //https://www.w3schools.com/jsref/met_node_removechild.asp
                //select all card
                //it is an array
                el1 = document.querySelectorAll(`.card--1`);
            
                el2 = document.querySelectorAll(`.card--2`);
                
                //remove all cards by going through each element of array
                el1.forEach((curEl)=>{
                    curEl.parentElement.removeChild(curEl);
                })
                
                el2.forEach((curEl)=>{
                    curEl.parentElement.removeChild(curEl);
                })


                dummy();


               



                if (state.playerOneDeck < 52 || state.playerTwoDeck < 52){
                    pileToDeck();
                }
            
                
               
            } else {

                dummy();
            
            }

            winnerLog();
        });

        

    
    } catch (error){
        alert(error);
    }
    
};

playWar();

           //receives the cards array from json, cardindex that is relevant to changing the card, and player number
        // const renderNewCard = (cards, index, playerNumber)=>{
        //     //render new card
        //     const cardIndex = (playerNumber*10)+index+1;
        //     document.querySelector(`.players-card__card--${cardIndex}`).addEventListener('click', async () =>{   
        //         count++
             
        //         const newCard = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`)).json();
                
        //         const displayNewCard = `<img src = ${newCard.cards[0].image} alt = ${newCard.cards[0].code}>`;
        //         const el = document.querySelector(`.players-card__card--${cardIndex}`);

        //         if(playerNumber ===1){
        //             state.playerCardsArray__1.splice(index,1,pokerSolverConversion(newCard.cards[0].code));
        //             console.log(state.playerCardsArray__1);
        //         } else if (playerNumber === 2){
        //             state.playerCardsArray__2.splice(index,1,pokerSolverConversion(newCard.cards[0].code));
        //         }
                
                
        //         //https://www.w3schools.com/jsref/met_node_removechild.asp
        //         el.removeChild(el.childNodes[0]);
        //         el.disabled=true;
                
        //         //https://dev.to/karataev/set-css-styles-with-javascript-3nl5
        //         let style = document.createElement('style');
        //         style.innerHTML = `
        //         .players-card__card--${cardIndex} {
        //         background-color: red;
        //         border-radius: 10px;
        //         padding: 4px;
        //         }
        //         `;
        //         document.head.appendChild(style);

        //         document.querySelector(`.players-card__card--${cardIndex}`).insertAdjacentHTML('beforeend', displayNewCard);


        //     });

        // };

        // const disableAllCards = (cardsArray, playerNumber) =>{
        //     //cardsArray is just the array of cards from the json passed down
        //     //https://www.w3schools.com/jsref/met_document_queryselectorall.asp
        //     for(let i=0; i < cardsArray.length; i++){
        //         const cardIndex = playerNumber * 10 + i + 1;
                
        //         document.querySelector(`.players-card__card--${cardIndex}`).disabled=true;
        //     }
        // };


        // if (state.playerOneDeck[0]>state.playerTwoDeck[0]){
            
        // }