
const state = {};





// const fetchAsyncA = async () => await (await fetch('https://api.github.com')).json()
// https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808

const playWar = async () => {
    try{
        const result = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await result.json();
        

        //this is an array of 5 
        const playerOne = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=${52/2}`)).json();
       console.log(playerOne.cards);
        
        const playerTwo= await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=${52/2}`)).json();
       


        state.playerOneDeck = playerOne.cards;
        console.log(state.playerOneDeck[0]);
 
        state.playerTwoDeck = playerTwo.cards;
        console.log( state.playerTwoDeck );

    

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

        const playerOnePile = [];
        state.playerOnePile = playerOnePile;
        const playerTwoPile = [];
        state.playerTwoPile = playerTwoPile;

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


        const compareCards = (playerOneCard,playerTwoCard) => {
            if (cardNumber(playerOneCard) > cardNumber(playerTwoCard)){
                state.playerOnePile.push(playerOneCard,playerTwoCard);//add card won onto pile for future use in deck api
                state.playerOneDeck.splice(0,1);//removes card from player one deck bc it is already in pile 
                state.playerTwoDeck.splice(0,1);//removes card from player two deck bc they lost
            } else if (cardNumber(playerTwoCard) > cardNumber(playerOneCard)){
                state.playerTwoPile.push(playerTwoCard,playerOneCard);
                state.playerTwoDeck.splice(0,1);//removes card from player one deck bc it is already in pile 
                state.playerOneDeck.splice(0,1);
            } 
        };


        const dummy = () =>{
            renderCard(state.playerOneDeck[0], 1);
            renderCard(state.playerTwoDeck[0], 2);



            let style = document.createElement('style');
            style.innerHTML = `
            .players-card__player-2{
                display: block;
                }
            .turn__button{
                display: none;
            }
            .showdown__button {
                display: inline-block;
                background-color: #FF4136;
            }
            `;
            document.head.appendChild(style);

            if (cardNumber(state.playerOneDeck[0].code) !== cardNumber(state.playerTwoDeck[0].code)){
                compareCards(state.playerOneDeck[0].code,state.playerTwoDeck[0].code);
            } else if (cardNumber(state.playerOneDeck[0].code) === cardNumber(state.playerTwoDeck[0].code)){
                renderCard(state.playerOneDeck[0], 1);
                renderCard(state.playerTwoDeck[0], 2);
            }

            
            console.log(state.playerOneDeck);
            console.log(state.playerOnePile);
            console.log(state.playerTwoDeck);
            console.log(state.playerTwoPile);


        }

        document.querySelector(`.war__button`).addEventListener('click', () =>{
            const el1 = document.querySelector(`.card--1`);
            const el2 = document.querySelector(`.card--2`);

            if (el1 && el2){
                //https://www.w3schools.com/jsref/met_node_removechild.asp
          
                el1.parentElement.removeChild(el1);
                el2.parentElement.removeChild(el2);

                dummy();
               
            } else {

                dummy();

            }
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