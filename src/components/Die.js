import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
    }
    return (
        <div className="die--face" style={styles} onClick={props.holdDice}>
            {/* <h2 className="die--number">{props.value}</h2> */}
            {props.value !== 1 && <div class="dots top-left"></div>}
            {(props.value === 4 || props.value === 5 || props.value === 6) && <div class="dots top-right"></div>}
            {props.value === 6 && <div class="dots center-left"></div>}
            {(props.value === 1 || props.value === 3 || props.value === 5) && <div class="dots center-center"></div>}
            {props.value === 6 && <div class="dots center-right"></div>}
            {(props.value === 4 || props.value === 5 || props.value === 6) && <div class="dots bottom-left"></div>}
            {props.value !== 1 && <div class="dots bottom-right"></div>}
        </div>
    );
}