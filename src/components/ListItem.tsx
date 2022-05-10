import React from 'react'
import { ICountry } from '../Interfaces';

interface Props {
  country: ICountry;
}

const ListItem = ({ country }: Props) => {
  return (
    <div>
      {country.name}
    </div>
  )
}

export default ListItem;