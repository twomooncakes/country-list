import React from 'react';
import css from './Button.module.css';

interface Props {
  children: string;
  invert?: boolean;
  onClick?(): void;
}

const Button = ({ children, invert, onClick }: Props) => {
  return (
    <button onClick={onClick} className={`${css.btn} ${invert ? css.inverted : ""}`}>{children}</button>
  )
}

export default Button;