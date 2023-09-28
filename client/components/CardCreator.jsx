// Presentational component
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCard } from "./cardSlice";
import { Button, OutlinedInput, Input } from '@mui/material';
import { Link } from 'react-router-dom';
import "../styles.scss";

const CardCreator = props => {
    
    const dispatch = useDispatch();

    const addCardHandleSubmit = (event) => {
        // Stops the page from refreshing on form submit
        event.preventDefault();
        // console.log('event.target in Maincontainer', event.target)
        // console.log('event target 0 value', event.target[0].value)

        // grabs the values from the frontend and saves it into an object
        const question = event.target[0].value;
        const answer = event.target[1].value;
        const hint = event.target[2].value;
        const category = event.target[3].value;
        const newCard = { category, question, answer, hint }
        dispatch(createCard(newCard));
    }


    return (
    <div>
        <h3 htmlFor="createNewCard"> Create a New Card! </h3>
            <Button id='homeButton' href="/" variant="contained">View Card Set On HomePage</Button>          
                <form onSubmit={addCardHandleSubmit}>
                <br/> <label> Question: </label> <br/>
                    <Input defaultValue='' className='input' id='questionInput' type="text"></Input>
                    <br/> <label> Answer: </label> <br/>
                    <Input className='input'  id='answerInput' type="text"></Input>
                    <br/> <label> Hint (optional) </label> <br/>
                    <Input className='input'  id='hintInput' type="text"></Input>
                    <br/> <label> Category: </label><br/>
                    <Input className='input'  id='categoryInput' defaultValue={props.category} type="text"></Input>
            <br></br>
            <Button variant="contained" type="submit">Add Card!</Button>          
            </form>
        <h3 htmlFor="editCards"> Double-click to Edit your Cards! </h3>
    </div>
  
    )
}

export default CardCreator;