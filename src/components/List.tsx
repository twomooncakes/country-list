import React, { useEffect, useState } from 'react'
import { ICountry } from '../Interfaces';
import css from './List.module.css';
import Button from './Button';
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
    <div className={css["list-container"]}>
      <h1 className={css.title}>Country List</h1>
      <div className={css["filter-container"]}>
        <div>
          <Button>Show countries smaller than Lithuania</Button>
          <Button>Show countries in Oceania region</Button>
        </div>
        <div>
          <Button>ASC/DESC</Button>
        </div>
      </div>
      <div className={css.list}>
        {list.map((item: ICountry, index: number) => {
          return <ListItem key={index} country={item} />
        })}
      </div>


      
    </div>
  )
}

export default List;