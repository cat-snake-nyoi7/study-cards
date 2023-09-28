import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import React from "react";

import { getCategoryCards } from '../components/cardSlice';
import FlipCard from '../components/FlipCard';
import { resetQuizBooleans, setNewDisplayCard } from '../components/cardSlice';


const QuizPage = () => {

    const dispatch = useDispatch();
    const { category } = useParams();
    const cards = useSelector(state => state.store.cards)
    const card_total = useSelector(state => state.store.card_total);
    const areCardsFetched = useSelector(state => state.store.areCardsFetched)
    const currentQ = useSelector(state => state.store.currentQ)
    
    useEffect(() => {
        dispatch(getCategoryCards(category))
    }, []);
    
    let index = currentQ - 1;
    let displayCard = cards[index];
    if(currentQ > card_total){

        displayCard = {
            question: 'GAME OVER!',
            hint: 'You did it!',
            answer: 'Nothing left! Try another quiz'
        }
    }


const goToNext = () => { 
    //set DisplayCard to the next card
    dispatch(setNewDisplayCard());
    //reset booleans in state.store
    dispatch(resetQuizBooleans());

}
    

    return (
        <div>
            <div class="quizHeader"> 
                <p> Quiz on: <b> {category} </b> ----  
                <i> Question #{(currentQ > card_total) ? card_total : currentQ}/{card_total} </i> </p>
                <Button variant="soft" color="success">
                    <Link to={'/'}>
                        Back to Home
                    </Link>
                </Button>
                <br/><br/><br/>
            </div>
            {!areCardsFetched || displayCard===undefined ? <p> Loading... </p> : (
            <div>
                <FlipCard card={displayCard} goToNext={goToNext}/>
                
            </div>
            )}
        </div>
    )
    
}

export default QuizPage;