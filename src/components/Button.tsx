import React from 'react';
import css from './Button.module.css';

interface Props {
  children: string;
}

const Button = ({ children }: Props) => {
  return (
    <button className={css.btn}>{children}</button>
  )
}

export default Button;