import React from "react";

import "./Switch.css";

interface Props {
    title?: string,
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    disabled?: boolean,
    active?: boolean,
}

const Switch: React.FC<Props> = ({
    title,
    onClick,
    disabled,
    active,
}) => {

    let stateClass = "inactive";
    if (active === true) stateClass = "on";
    if (active === false) stateClass = "off";

    return (
        <div className={`switch ${disabled ? "disabled" : ""} ${stateClass}`} onClick={onClick}>
            <span className="title">{title}</span>
            <div className="states">
                <div className="off">OFF</div>
                <div className="on">ON</div>
            </div>
        </div>
    );
}

export default Switch;