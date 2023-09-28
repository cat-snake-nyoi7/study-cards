import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    cards: [],
    categories: [],
    card_total: 0,
    consecutivelyCorrect: 0, //future state for tracking success rate
    isCategoriesFetched: false, // renders loading on false, renders all categories on true
    areCardsFetched: false,// renders loading on false, renders all cards on true
    isCorrect: false, //causes the next button to be available
    showHint: false, //flips to the hint specifically
    showAnswer: false, //flips the card
    isWrong: false,
    showNext: false,
    currentQ: 1,
    showInputElement: false
}

// thunks / aka async action creators
//getCategories
export const getCategories = createAsyncThunk('/api/categories', async () => {

    try {
        const response = await fetch('/api/categories')
            .then((res) => res.json())

        return response;
    }

    catch (error) {
        console.log(error);
    }
});

// getCategoryCards
export const getCategoryCards = createAsyncThunk('/api/categoryCards', async (category) => {
    try {
        const response = await fetch(`/api/cards/${category}`)
            .then((response) => response.json())
        
        console.log('Thunk response to getCategoryCards: ', response);
        return response;
    }
    catch (error) {
        console.log(error);
    }
});

// createCard
export const createCard = createAsyncThunk('/api/createCard', async (card) => {
    let defaultHeader = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
    }
    try {
        const response = await fetch('/api/cards', defaultHeader)
            .then((data) => data.json());
        console.log('createCard response', response);
        return response;
    }
    catch (err) {
        console.log(err);
    }
})
// editCard
export const editCard = createAsyncThunk('/api/editCard', async (card) => {
    let defaultHeader = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
    }
    try {
        console.log('defaultHeader from editCard', defaultHeader);
        const response = await fetch(`/api/cards/${card._id}`, defaultHeader)
            .then((data) => data.json());
        console.log('response from Put request', response);
        return response;
    }
    catch (err) {
        console.log(err);
    }
})

// deleteCard
export const deleteCard = createAsyncThunk('/api/deleteCard', async (id) => {
    let defaultHeader = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const response = await fetch(`/api/cards/${id}`, defaultHeader)
            .then((data) => data.json());
        console.log('this is the response', response)
        return response;
    }
    catch (err) {
        console.log(err);
    }
});

function findIndex(target, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]._id === target) {
            return i;
        }
    }
}


export const cardSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {

        setHint: (state, action) => {
            console.log('setHint was invoked :)');
            if(action.payload) {
                state.showHint = true;
            }
        },

        setRight: (state, action) => {
            state.isCorrect = true;
            state.isWrong = false;
        },
        setWrong: (state, action) => {
            state.isWrong = true;
            state.isCorrect = false;
        },
        setNext: (state, action) => {
            state.showNext = true;
        },
        
        resetQuizBooleans: (state, action) => {
            //reset these state variables whenever we visit mainpage
            // or when we click next
            state.showNext = false;
            state.showHint = false;
            state.isCorrect = false;
            state.isWrong = false;
        },

        setNewDisplayCard: (state, action) => {
            state.currentQ++;
        },
        decrementCurrentQ: (state, action) => {
            state.currentQ--;
        },

        setShowInputElement: (state, action) => {
            if (action.payload) {
                state.showInputElement = true;
            }
            else {
                state.showInputElement = false;
            }
        }
    },
    // Below reducers not necessary given our utilization of extra reducers!

    // addCard: (state, action) => {

    //     let newCard = {

    //         id: action.payload._id,
    //         data: {
    //             category: action.payload.category,
    //             question: action.payload.question,
    //             answer: action.payload.answer,
    //             hint: action.payload.hint
    //         }
    //     };

    //     state.cards.push(newCard);
    //     state.cards.card_total++;
    //     if (!state.categories.includes(action.payload.category)) {
    //         state.categories.push(action.payload.category)
    //     }
    // },

    // deleteCard: (state, action) => {

    //     const index = findIndex(action.payload._id, state.cards);
    //     state.cards = state.cards.slice(0, index).concat(state.cards.slice(index + 1));
    //     state.card_total--;

    // },

    // editCard: (state, action) => {
    //     const index = findIndex(action.payload._id, state.cards);
    //     const updatedCard = {

    //         id: action.payload._id,
    //         data: {
    //             category: action.payload.category,
    //             question: action.payload.question,
    //             answer: action.payload.answer,
    //             hint: action.payload.hint
    //         }
    //     };
    //     state.cards[index] = updatedCard;
    //     if(!state.categories.includes(action.payload.category)) {
    //         state.categories.push(action.payload.category)
    //     }
    // },

    // getCategoryCards: (state, action) => {
    //     //action.payload = array of card objects
    //     state.cards = action.payload;
    //     state.card_total = state.cards.length;
    // },

    extraReducers: {
//--------------------- InitialState: isCatergoriesFetched --------------------------------------------------------------
        [getCategories.fulfilled]: (state, action) => {
            state.isCategoriesFetched = true;
            state.categories = action.payload;
            state.currentQ = 1; //reset on Homepage -> always 1 at quiz start
        },
        [getCategories.pending]: (state, action) => {
            state.isCategoriesFetched = false;
        },
        [getCategories.rejected]: (state, action) => {
            state.isCategoriesFetched = false;
        },
        //---------------------- InitialState: areCardsFetched -----------------------------------------------------------
        [getCategoryCards.fulfilled]: (state, action) => {
            console.log('getCategoryCards reducer invoked');
            state.areCardsFetched = true;
            state.cards = action.payload;
            state.card_total = state.cards.length;
        },

        [getCategoryCards.pending]: (state, action) => {
            state.areCardsFetched = false;
        },

        [getCategoryCards.rejected]: (state, action) => {
            state.areCardsFetched = false;
        },
        //------------------- InitialState: cards (created and added to the cards array)---------------------------------
        [createCard.fulfilled]: (state, action) => {
            let newCard = {
                _id: action.payload._id,
                category: action.payload.category,
                question: action.payload.question,
                answer: action.payload.answer,
                hint: action.payload.hint
            };
            console.log('newCard at createCard reducer', newCard);
            state.cards = [newCard, ...state.cards]
            // state.cards.push(newCard);
            state.cards.card_total++;
            if (!state.categories.includes(action.payload.category)) {
                state.categories.push(action.payload.category)
            }
        },
        //------------------- editCard Reducer -----------------------------------------------------------------------
        [editCard.fulfilled]: (state, action) => {
            console.log('action payload is', action.payload);
            const index = findIndex(action.payload._id, state.cards);
            const updatedCard = {
                _id: action.payload._id,
                category: action.payload.category,
                question: action.payload.question,
                answer: action.payload.answer,
                hint: action.payload.hint
            };
            state.cards[index] = updatedCard;
            if (!state.categories.includes(action.payload.category)) {
                state.categories.push(action.payload.category)
            }
        },
        //------------------- deleteCard reducer -----------------------------------------------------------------------
        [deleteCard.fulfilled]: (state, action) => {
            const index = findIndex(action.payload._id, state.cards);
            state.cards = state.cards.slice(0, index).concat(state.cards.slice(index + 1));
            state.card_total--;
        }
    }
})

export const {
    setHint,
    setRight,
    setWrong,
    setNext,
    resetQuizBooleans,
    setNewDisplayCard,
    decrementCurrentQ,
    setShowInputElement
} = cardSlice.actions;

export default cardSlice.reducer;