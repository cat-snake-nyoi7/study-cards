// Presentational component
import React from "react";
import Card from './Card.jsx';


const CardDisplay = (props) => {
    const { card } = props;

    return (
        <Card 
        _id = {card._id}
        question = {card.question}
        answer = {card.answer}
        hint = {card.hint}
        category = {card.category}
        />
    )
}

export default CardDisplay;