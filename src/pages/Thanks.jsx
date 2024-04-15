import React,{useEffect} from "react";
import './Thanks.css';
import { useNavigate,Link } from "react-router-dom";


export default function Thanks(){
    const navigate = useNavigate();

    useEffect(() => {
      const timerId = setTimeout(() => navigate('/'), 5000); // 5 seconds
  
      return () => clearTimeout(timerId); // Cleanup function to prevent memory leaks
    }, [navigate]);
    return (
        <>
        <div className="thankspage">
            <img src="../public/image-3.png" alt="" />
            <h1>
                thanks for your feedback!
            </h1>
        </div>
        </>
    )
}
