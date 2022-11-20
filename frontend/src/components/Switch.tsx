import React from "react";

import "./Switch.css";

interface Props {
    title?: string,
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    disabled?: boolean,
    active?: boolean,
    style?: React.CSSProperties,
    className?: string,
}

const Switch: React.FC<Props> = ({
    title,
    onClick,
    disabled,
    active,
    style,
    className = "",
}) => {

    let stateClass = "inactive";
    if (active === true) stateClass = "on";
    if (active === false) stateClass = "off";

    return (
        <div className={`switch ${disabled ? "disabled" : ""} ${stateClass} ${className}`} onClick={onClick} style={style}>
            <span className="title">{title}</span>
            <div className="states">
                <div className="off">OFF</div>
                <div className="on">ON</div>
            </div>
        </div>
    );
}

export default Switch;