import React, { useEffect } from "react";
 import './Home.css';
 import { useNavigate,Link } from "react-router-dom";
//welcome page

export default function Home(){
    const navigate = useNavigate();

    // useEffect(()=>{
    //     navigate("/survey");
    // },["#startbtn"])
    return (
        <>
            <div className="welcomePage">
                <h1 className="welcomeMessage"> welcome to our shop survey</h1>
                <div className="welcomeimagecont">
                    <img src="../public/image-1.png" alt="" />
                    <Link to="/survey">
                        <button id="startBtn">Start</button>
                    </Link>
                </div>
            </div>
        </>
    )
}