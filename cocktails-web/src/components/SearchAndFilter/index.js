import React, { useState } from 'react';
import Filter from '../Filter';
import Search from '../Search';
import { toArray } from '../../common';

const SearchAndFilter = (props) => {
   const [showFilter, setShowFilter] = useState(true);
   const [searchValue, setSearchValue] = useState('');
   const [keepFocus, setKeepFocus] = useState(false);

   const toggle = (val, keepFocus) => {
      if (!props.menuVisible) {
         setShowFilter((s) => !s);
         if (val) {
            setSearchValue(val);
         }
         setKeepFocus(Boolean(keepFocus));
      }
   };

   const onFilter = (f) => {
      props.onFilter(f);
   };

   const onSearch = (s) => props.onFilter(toArray(s));

   return (
      <>
         {!showFilter && (
            <Search
               filterValues={props.filterValues}
               searchValue={searchValue}
               toggle={toggle}
               onSearch={onSearch}
            />
         )}
         {showFilter && (
            <Filter
               filterValues={props.filterValues}
               toggle={toggle}
               onFilter={onFilter}
               keepFocus={keepFocus}
               menuVisible={props.menuVisible}
            />
         )}
      </>
   );
};

export default SearchAndFilter;
