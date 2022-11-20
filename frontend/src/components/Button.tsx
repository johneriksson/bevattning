import React from "react";

import "./Button.css";

interface Props {
    title: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	type?: "button" | "submit" | "reset" | undefined,
    disabled?: boolean,
    color?: string,
}

const Button: React.FC<Props> = ({
    title,
    onClick,
	type = "button",
    disabled,
    color,
}) => {

    return (
        <button className={`button color-${color}`} onClick={onClick} type={type} disabled={disabled}>
            <span>{title}</span>
        </button>
    );
}

export default Button;