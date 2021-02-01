import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { getSearchResultList } from '../../common/filters';
import {
   SearchResultContainer,
   ClickInterceptor,
   SearchInputWrapper,
   ClearSearch,
} from '../../common/styles';
import { SearchWrapper, SearchInput, SearchResultItem } from './styles';
import ConditionalRender from '../ConditionalRender';

const Search = (props) => {
   const [result, setResult] = useState([]);
   const [searchResultOpen, setSearchResultOpen] = useState(false);
   const [selectedIndex, setSelectedIndex] = useState(-1);
   const [showClear, setShowClear] = useState(false);
   const inputRef = useRef(null);

   const searchForValue = (val) => {
      setSearchResultOpen(false);
      inputRef.current.value = val;
      props.onSearch(val);
   };

   useEffect(() => {
      if (props.shouldReset) {
         clearSearch();
      }
   }, [props.shouldReset]);

   useEffect(() => {
      if (result.length > 0) {
         setSearchResultOpen(true);
      } else {
         setSearchResultOpen(false);
      }
   }, [result]);

   useEffect(() => {
      if (props.searchValue && inputRef.current) {
         inputRef.current.value = props.searchValue;
         inputRef.current.focus();
      }
   }, []);

   const keys = { UP: 38, DOWN: 40, ESC: 27, ENTER: 13 };
   const onKeyUp = (e) => {
      const searchValue = e.target.value;
      switch (e.keyCode) {
         case keys.DOWN:
            setSelectedIndex((state) =>
               state < result.length - 1 ? state + 1 : 0
            );
            return;
         case keys.UP:
            setSelectedIndex((state) =>
               state > 0 ? state - 1 : result.length - 1
            );
            return;
         case keys.ENTER:
            if (result[selectedIndex]) {
               searchForValue(result[selectedIndex]);
            } else {
               searchForValue(searchValue);
               setSearchResultOpen(false);
            }
            return;
         case keys.ESC:
            setResult([]);
            setSelectedIndex(-1);
            return;
      }

      if (searchValue.length > 0) {
         setShowClear(true);
      } else if (searchValue.length > 2) {
         setResult(getSearchResultList(props.filterValues, searchValue));
      } else if (searchValue.length === 0) {
         setResult([]);
         setShowClear(false);
         props.toggle('', true);
      }
   };

   const clearSearch = () => {
      inputRef.current.value = '';
      setResult([]);
      setSelectedIndex(-1);
      setShowClear(false);
      props.onSearch([]);
      console.log('as');
   };

   return (
      <SearchWrapper>
         <SearchInputWrapper>
            <SearchInput
               type="text"
               placeholder="Sök"
               onKeyUp={onKeyUp}
               ref={inputRef}
            />
            <ConditionalRender predicate={showClear}>
               <ClearSearch onClick={clearSearch}>&times;</ClearSearch>
            </ConditionalRender>
         </SearchInputWrapper>
         {searchResultOpen && (
            <>
               <ClickInterceptor
                  onClick={() => {
                     setSearchResultOpen(false);
                  }}
               />
               <SearchResult
                  result={result}
                  selectedIndex={selectedIndex}
                  onItemClick={searchForValue}
               />
            </>
         )}
      </SearchWrapper>
   );
};

const SearchResult = (props) => {
   const selectedRef = useRef(null);
   const containerRef = useRef(null);
   useEffect(() => {
      let observer = null;
      if (selectedRef && selectedRef.current) {
         if (props.selectedIndex === 0) {
            containerRef.current.scroll(0, 0);
         } else {
            const options = { root: containerRef.current };
            observer = new IntersectionObserver((entries) => {
               const entry = entries[0];

               if (!entry.isIntersecting) {
                  entry.target.scrollIntoView(true);
               }
            }, options);
            observer.observe(selectedRef.current);
         }
      }
      return () => {
         if (observer) {
            observer.disconnect();
         }
      };
   }, [props.selectedIndex]);

   useEffect(() => {
      if (props.result.length > 0) {
         anime({
            targets: containerRef.current,
            maxHeight: 220,
            duration: 500,
         });
      }
   }, [props.result]);

   return (
      <SearchResultContainer open={props.result.length > 0} ref={containerRef}>
         {props.result.map((r, i) => (
            <SearchResultItem
               key={i}
               selected={i === props.selectedIndex}
               ref={i === props.selectedIndex ? selectedRef : null}
               onClick={() => props.onItemClick(r)}
            >
               {r}
            </SearchResultItem>
         ))}
      </SearchResultContainer>
   );
};

export default Search;
