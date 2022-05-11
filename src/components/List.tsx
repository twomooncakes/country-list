import React, { useEffect, useState } from 'react'
import { ICountry } from '../Interfaces';
import css from './List.module.css';
import Button from './Button';
import ListItem from './ListItem';
import Pagination from './Pagination';

const List = () => {
  const [initList, setInitList] = useState<ICountry[]>([]);
  const [list, setList] = useState<ICountry[]>([]);
  const [sortASC, setSortASC] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [filters, setFilters] = useState({ 
    smallerThanCountryFilter: {
      isActive: false,
      countryName: "Lithuania",
    }, 
    regionFilter: {
      isActive: false,
      region: "Oceania",
    }, 
  });

  const sortListAlphabetically = (list: ICountry[]) => {
    return list.sort((a:ICountry, b:ICountry) => sortASC ? (a.name > b.name ? 1 : -1) : (b.name > a.name ? 1 : -1))
  }

  const handleSort = async () => {
    setList(list.sort((a:ICountry, b:ICountry) => !sortASC ? (a.name > b.name ? 1 : -1) : (b.name > a.name ? 1 : -1)))
    setSortASC(!sortASC);
    setCurrentPage(1);
  }

  const handleRegionFilter = () => {
    setFilters({...filters, regionFilter: {...filters.regionFilter, isActive: !filters.regionFilter.isActive} });
  }

  const handleSmallerThanCountryFilter = () => {
    setFilters({...filters, smallerThanCountryFilter: {...filters.smallerThanCountryFilter, isActive: !filters.smallerThanCountryFilter.isActive } });
  }

  const handleFiltering = () => {
    const areaOfCountry = initList.find((country: ICountry) => country.name === filters.smallerThanCountryFilter.countryName)!.area;
    const unsortedList = initList.slice();
    setCurrentPage(1);

    if(filters.smallerThanCountryFilter.isActive && filters.regionFilter.isActive) {
      setList(sortListAlphabetically(unsortedList.filter((country:ICountry) => country.area < areaOfCountry && country.region === filters.regionFilter.region)));
      return;
    }
    
    if(filters.smallerThanCountryFilter.isActive) {
      setList(sortListAlphabetically(unsortedList.filter((country:ICountry) => country.area < areaOfCountry)));
      return;
    }
        
    if(filters.regionFilter.isActive) {
      setList(sortListAlphabetically(unsortedList.filter((country:ICountry) => country.region === filters.regionFilter.region)));
      return;
    }

    setList(sortListAlphabetically(initList));
  }

  useEffect(() => {
    const getListData = async () => {
      const res = await fetch("https://restcountries.com/v2/all?fields=name,region,area");
      const listData = await res.json();
      setList(sortListAlphabetically(listData));
      setInitList(sortListAlphabetically(listData));
    }

    getListData();

    return () => {
      setList([]);
    }
  }, [])

  useEffect(() => {
    initList.length > 0 && handleFiltering();

  }, [filters])

  // Pagination
  const idxOfLastItem = currentPage * itemsPerPage;
  const idxOfFirstItem = idxOfLastItem - itemsPerPage;

  const paginate = (pageNumber: number) => {
    console.log('paginate' + pageNumber);
    setCurrentPage(pageNumber);
  }
  
  return (
    <div className={css["list-container"]}>
      <h1 className={css.title}>Country List</h1>

      <div className={css["filter-container"]}>
        <div className={css.left}>
          <Button invert={filters.smallerThanCountryFilter.isActive} onClick={handleSmallerThanCountryFilter}>{`Show countries smaller than ${filters.smallerThanCountryFilter.countryName}`}</Button>
          <Button invert={filters.regionFilter.isActive} onClick={handleRegionFilter}>{`Show countries in ${filters.regionFilter.region} region`}</Button>
        </div>
        <div className={css.right}>
          <Button onClick={handleSort}>{sortASC ? "Z - A" : "A - Z"}</Button>
        </div>
      </div>

      <div className={css.list}>
        {list.slice(idxOfFirstItem, idxOfLastItem).map((item: ICountry, index: number) => {
          return <ListItem key={index} country={item} />
        })}
      </div>
      <Pagination itemsPerPage={itemsPerPage} totalItems={list.length} currentPage={currentPage} paginate={paginate} />
    </div>
  )
}

export default List;