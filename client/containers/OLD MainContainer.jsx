// //stateful containers that will update presentational componenets
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import CardDisplay from "../components/CardDisplay";
// import CardCreator from "../components/CardCreator";
// import { getCategories, getCategoryCards, createCard, editCard, deleteCard } from "../components/cardSlice.js";
// import { useEffect } from "react";

// // console.log('POST CARD THINK FROM MAIN CONTAINER', postCardThunk())

// // const { createCard, editCard, deleteCard } = cardSlice.reducers

// // console.log('CREATE CARD', createCard)

// // const fetchRequest = async (card, method) => {
// //     // If no "method" is passed, it uses this default header
// //     let defaultHeader = {
// //         method: "GET",
// //         headers: {
// //             "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify(card)
// //     }

// //     // if a method is is passed, it updates the default header
// //     let header = Object.assign({}, defaultHeader, method)

// //     // console.log('YOU HAVE HIT THE FETCH REQUEST', header)

// //     const result = await fetch('/api/cards', header)
// //         .then((data) => data.json())
// //         // .then((data) => console.log('DATA', data))
// //         .catch((err) => console.error(err))

// //     return result;
// // }

// const MainContainer = () => {

//     // THE STATES
//     // const idSelector = useSelector(state => state.id);
//     // const wordSelector = useSelector(state => state.word);
//     // const definitionSelector = useSelector(state => state.definition);
//     // const user_idSelector = useSelector(state => state.user_id);
//     // const entities = useSelector(state => state.entities);
//     // const loading = useSelector(state => state.loading);

//     // const { entities, loading } = useSelector((state) => state.cards);

//     const dispatch = useDispatch();

//     // useEffect(() => {
//     //     dispatch(getCardThunk());
//     // }, []);

//     // console.log('ENTITIEISIESIS', entities);

//     const addCardHandleSubmit = (event) => {
//         // Stops the page from refreshing on form submit
//         event.preventDefault();

//         // grabs the values from the frontend and saves it into an object
//         const word = event.target[0].value
//         const def = event.target[1].value
//         const newCard = { word: word, definition: def }

//         // passes the value object into the fetch request
//         const fetchedNewCard = postCardThunk(newCard)
//         // console.log('FETCHED NEW CARD', fetchedNewCard)

//         // dispatches what gets returned from the server
//         dispatch(fetchedNewCard)
//     }
//     console.log('ENTITIES', entities)

//     const editCardHandleSubmit = event => {
//         event.preventDefault();
//         const editedCard = event.target[0].value
//         dispatch(editCard(editedCard))
//     }

//     const deleteCardHandleSubmit = event => {
//         event.preventDefault();
//         const cardIDToDelete = event.target[0].value
//         dispatch(deleteCard(cardIDToDelete))
//     }

//     return (
//         <div>Hello from MainContainer
//             {/* <CardCreator addCardHandleSubmit={addCardHandleSubmit} />
//             <CardDisplay
//                 entities={entities}
//                 editCardHandleSubmit={editCardHandleSubmit}
//                 deleteCardHandleSubmit={deleteCardHandleSubmit}
//             /> */}

//         </div>


//     )



// }
// // STATES FOR CARD DISPLAY WILL BE HERE

// // IT WILL RETURN DIVS THAT INCLUDE ALL OF THE CARDS THAT CARD DISPLAY CREATES

// // IT WILL PASS DOWN THE CARD ID, WORD, AND DEFINITION AS PROPS

// export default MainContainer;