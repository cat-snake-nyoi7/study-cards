import React, { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { editCard, deleteCard, setShowInputElement } from "./cardSlice";
import { useState, useEffect } from 'react';
import ElementMaker from './ElementMaker';
import Button from '@mui/material/Button';

const Card = props => {

  const dispatch = useDispatch();
  
  //delete button event
  const deleteCardHandleSubmit = (event) => {
    event.preventDefault();
    dispatch(deleteCard(props._id));
  }

  //edit button event
  const editQuestionHandleSubmit = (event) => {
    // event.preventDefault();
    // console.log('editQuestionHandleSubmit is running');
    let newObj = {
      _id: props._id,
      category: props.category,
      question: event,
      answer: props.answer,
      hint: props.hint
    }
    dispatch(editCard(newObj));
  }

  const editAnswerHandleSubmit = (event) => {
    // event.preventDefault();
    // console.log('editQuestionHandleSubmit is running');
    let newObj = {
      _id: props._id,
      category: props.category,
      question: props.question,
      answer: event,
      hint: props.hint
    }
    dispatch(editCard(newObj));
  }

  const editHintHandleSubmit = (event) => {
    // event.preventDefault();
    // console.log('editQuestionHandleSubmit is running');
    let newObj = {
      _id: props._id,
      category: props.category,
      question: props.question,
      answer: props.answer,
      hint: event
    }
    dispatch(editCard(newObj));
  }

  const editCategoryHandleSubmit = (event) => {
    // event.preventDefault();
    // console.log('editQuestionHandleSubmit is running');
    let newObj = {
      _id: props._id,
      category: event,
      question: props.question,
      answer: props.answer,
      hint: props.hint
    }
    dispatch(editCard(newObj));
  }

  const showInputElement = useSelector(state => state.store.showInputElement);

  return (
    <div className="cardBox">
      <strong> Question: </strong>
        <ElementMaker className= 'elementMaker' value={props.question} handleChange={(e) => editQuestionHandleSubmit(e.target.value)} handleDoubleClick={() => dispatch(setShowInputElement(!showInputElement))} showInputEle={showInputElement}/>
      <strong> Answer: </strong>
        <ElementMaker className= 'elementMaker' value={props.answer} handleChange={(e) => editAnswerHandleSubmit(e.target.value)} handleDoubleClick={() => dispatch(setShowInputElement(!showInputElement))} showInputEle={showInputElement}/>
      <strong> Hint: </strong>
        <ElementMaker className= 'elementMaker' value={props.hint} handleChange={(e) => editHintHandleSubmit(e.target.value)} handleDoubleClick={() => dispatch(setShowInputElement(!showInputElement))} showInputEle={showInputElement}/>
      <strong> Category: </strong>
        <ElementMaker className= 'elementMaker' value={props.category} handleChange={(e) => editCategoryHandleSubmit(e.target.value)} handleDoubleClick={() => dispatch(setShowInputElement(!showInputElement))} showInputEle={showInputElement}/>
      <div>
        <Button variant="outlined" id='id' onClick={deleteCardHandleSubmit}>Delete Card</Button>  
        {/* <button ></button> */}
      </div>
    </div>
  )
}
  
  export default Card;