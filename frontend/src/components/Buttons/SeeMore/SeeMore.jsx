import React from "react";
import "./SeeMore.css";

function SeeMore({ icon: Icon, onClick, tooltip }) {
    return (
        <div className="see-more-wrapper">
            <button className="see-more-btn" onClick={onClick}>
                <Icon />
            </button>
            <span className="see-more-tooltip">{tooltip}</span>
        </div>
    );
}

export default SeeMore;
