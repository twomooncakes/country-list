import React, { useEffect, useState } from 'react'
import { ICountry } from '../Interfaces';
import ListItem from './ListItem';

const List = () => {
  const [list, setList] = useState<ICountry[]>([]);

  const getListData = async () => {
    const res = await fetch("https://restcountries.com/v2/all?fields=name,region,area");
    const listData = await res.json();
    setList(listData);
  }

  useEffect(() => {
    getListData();
  
    return () => {
      setList([]);
    }
  }, [])
  
  return (
    <div>
      {list.map((item: ICountry, index: number) => {
        return <ListItem key={index} country={item} />
      })}
    </div>
  )
}

export default List;