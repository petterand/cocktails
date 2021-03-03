import React, { useState } from 'react';
import Filter from '../Filter';
import Search from '../Search';

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

   return (
      <>
         {!showFilter && (
            <Search
               filterValues={props.filterValues}
               searchValue={searchValue}
               toggle={toggle}
               onSearch={props.onSearch}
               shouldReset={props.shouldReset}
            />
         )}
         {showFilter && (
            <Filter
               filterValues={props.filterValues}
               toggle={toggle}
               onFilter={onFilter}
               keepFocus={keepFocus}
               menuVisible={props.menuVisible}
               shouldReset={props.shouldReset}
            />
         )}
      </>
   );
};

export default SearchAndFilter;
