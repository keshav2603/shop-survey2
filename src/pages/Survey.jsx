import React, { useState, useEffect } from "react";
import "./Survey.css";
import { useNavigate } from "react-router-dom";
export default function Survey() {
    const navigate = useNavigate();
    const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
    const [responses, setResponses]=useState({
        1:null,
        2:null,
        3:null,
        4:null,
        5:''
        });
        const questions = [
            { id: 1, 
                text: "How satisfied are you with our products?", 
                type: "rating", 
                min: 1, 
                max: 5 },
            { id: 2, 
                text: "How fair are the prices compared to similar retailers?", 
                type: "rating", 
                min: 1, 
                max: 5 },
            { id: 3, 
                text: "How satisfied are you with the value for money of your purchase?", 
                type: "rating", 
                min: 1, 
                max: 5 },
            { id: 4, 
                text: "On a scale of 1-10 how would you recommend us to your friends and family?", 
                type: "rating", 
                min: 1, 
                max: 10 },
            { id: 5, 
                text: "What could we do to improve our service?", 
                type: "text" }
                //if you wont to add more questions simple add here with new  id
          ];
    const renderQuestion=()=>{
        const questionId=currentQuestionIndex+1;
        const question=getQuestionById(questionId);
        return question.text;

    }
    useEffect(() => {
        localStorage.setItem('surveyResponses', JSON.stringify(responses));
      }, [responses]);
      // these two useEffect get snd set the value in local storage even if they navigate away from the page and return later.
      useEffect(() => {
        const storedResponses = localStorage.getItem('surveyResponses');
        if (storedResponses) {
          setResponses(JSON.parse(storedResponses));
        }
      }, []);

    const handleResponseChange = (value) => {
        const questionId = currentQuestionIndex + 1;
        setResponses(prevResponses => ({
          ...prevResponses,
          [questionId]: value
        }));
      };

    const getQuestionById=(id)=>{
          return questions.find(question => question.id===id);
    }
    const handelNextQuestion= () =>{
        if(currentQuestionIndex < questions.length-1){
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        // console.log(currentQuestionIndex);
        }else{
            const confirmed = window.confirm("Are you sure you want to submit the survey?");
           if(confirmed){
            navigate('/thanks');
           }
        }
}
    const handelPreviousQuestion= () =>{
        if(currentQuestionIndex >0 ){
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
        // console.log(currentQuestionIndex);
    }
    const displayQuestionNumber =()=>{
        return (`${currentQuestionIndex+1}/${questions.length} `);
    }
    const displayInput = () => {
        const questionId = currentQuestionIndex + 1;
        const question = getQuestionById(questionId);
    
        if (question.type === "rating") {
            return (
                <div>
                    {[...Array(question.max)].map((_, index) => (
                        <button
                            className={`user-rating-btn ${responses[questionId] === index + 1 ? 'selected' : ''}`}
                            key={index + 1}
                            onClick={() => handleResponseChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            );
        } else if (question.type === 'text') {
            return (
                <textarea
                    value={responses[questionId]}
                    placeholder="enter feedback here..."
                    className="user-text-input"
                    onChange={(e) => handleResponseChange(e.target.value)}
                />
            );
        }
    }
    return (
        <>
            <div className="surveypage">
                <h1 className="surveyHeading"> Customer Survey </h1>
                <div className="displayquestion">
                    <img src="../public/image-2.png" alt="" />
                    <div id="questionplace">
                        <div className="displayque"> {renderQuestion()}</div>
                        <div className="displayQuenumber">
                        {displayQuestionNumber()}
                        </div>
                    </div>
                </div>
                <div className="ratingarea"> 
                    {displayInput()} 
                </div>
                <div className="navigate-question">

                    <button id="prevbtn" onClick={handelPreviousQuestion} disabled={currentQuestionIndex === 0}>previous</button>
                    <button id="nextbtn" onClick={handelNextQuestion} >next</button>
                </div>
            </div>
        </>
    )
}

