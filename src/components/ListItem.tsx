import React from 'react'
import { ICountry } from '../Interfaces';
import css from './ListItem.module.css';

interface Props {
  country: ICountry;
}

const ListItem = ({ country }: Props) => {
  return (
    <div className={css["list-item"]}>
      <p>{country.name}</p>
      <p>{country.region}</p>
      <p>{country.area}</p>
    </div>
  )
}

export default ListItem;