import React, { useState, useEffect, useRef } from 'react';
import { SearchInputWrapper, ClearSearch } from '../../common/styles';
import { SearchWrapper, SearchInput } from './styles';
import ConditionalRender from '../ConditionalRender';

const Search = (props) => {
   const [showClear, setShowClear] = useState(false);
   const inputRef = useRef(null);

   const searchForValue = (val) => {
      inputRef.current.value = val;
      props.onSearch(val, (res) => {
         if (res.length > 0) {
            inputRef.current.blur();
         }
      });
   };

   useEffect(() => {
      if (props.shouldReset) {
         clearSearch();
      }
   }, [props.shouldReset]);

   useEffect(() => {
      if (props.searchValue && inputRef.current) {
         inputRef.current.value = props.searchValue;
         inputRef.current.focus();
      }
   }, []);

   const keys = { ESC: 27, ENTER: 13 };
   const onKeyUp = (e) => {
      const searchValue = e.target.value;
      switch (e.keyCode) {
         case keys.ENTER:
            searchForValue(searchValue);
            return;
         case keys.ESC:
            e.target.value = '';
            return;
      }

      if (searchValue.length > 0) {
         setShowClear(true);
      } else if (searchValue.length === 0) {
         setShowClear(false);
         props.toggle('', true);
      }
   };

   const clearSearch = () => {
      inputRef.current.value = '';
      setShowClear(false);
      props.onSearch();
   };

   return (
      <SearchWrapper>
         <SearchInputWrapper>
            <SearchInput
               type="text"
               placeholder="Sök"
               onKeyUp={onKeyUp}
               onFocus={props.onFocus}
               ref={inputRef}
               aria-label="Sök"
            />
            <ConditionalRender predicate={showClear}>
               <ClearSearch onClick={clearSearch}>&times;</ClearSearch>
            </ConditionalRender>
         </SearchInputWrapper>
      </SearchWrapper>
   );
};

export default Search;
