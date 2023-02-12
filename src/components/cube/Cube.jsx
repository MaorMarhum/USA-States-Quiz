import React, { useState, useEffect } from "react";
import "./Cube.css";

const Cube = ({ winner }) => {
    const [translateX, setTranslateX] = useState(300);

    useEffect(() => {
        if (winner) {
            setTranslateX(-300);
        } else {
            setTranslateX(300);
        }
    }, [winner]);

    return (
        <div className="container">
            <div
                className="cube"
                style={{ transform: `translateX(${translateX}%)` }}
            >
                <div className="side front"></div>
            </div>
        </div>
    );
};

export default Cube;
