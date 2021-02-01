import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { getTop5Ingredients } from '../../common/filters';
import {
   SearchResultContainer,
   ClickInterceptor,
   SearchInput,
   ClearSearch,
} from '../../common/styles';
import { FilterItem, SelectedFilters, BadgeList, BadgeItem } from './styles';
import Checkbox from '../Checkbox';

const FilterBadges = (props) => {
   return (
      <BadgeList>
         {props.filters.map((filter, i) => (
            <BadgeItem key={i}>{filter}</BadgeItem>
         ))}
      </BadgeList>
   );
};

const Filter = (props) => {
   const [filtersOpen, setFiltersOpen] = useState(false);
   const [filters, setFilters] = useState([]);
   const [selectedFilters, setSelectedFilters] = useState([]);
   const resultRef = useRef(null);
   const inputRef = useRef(null);

   const onCheckboxClick = (f) => (e) => {
      const updatedFilters = filters.map((f1) =>
         f1.value === f.value ? { ...f1, checked: e.target.checked } : f1
      );
      setFilters(updatedFilters);
   };

   const toggleList = (e) => {
      e.stopPropagation();
      if (!props.menuVisible) {
         setFiltersOpen((s) => !s);
      }
   };

   useEffect(() => {
      if (props.shouldReset) {
         clearFilters();
      }
   }, [props.shouldReset]);

   useEffect(() => {
      if (props.keepFocus) {
         inputRef.current.focus();
      }
   }, [props.keepFocus]);

   useEffect(() => {
      const top5 = getTop5Ingredients(props.filterValues.ingredients);
      setFilters(top5.map((f) => ({ value: f, checked: false })));
   }, [props.filterValues]);

   useEffect(() => {
      const checked = filters.filter((f) => f.checked).map((f) => f.value);
      props.onFilter(checked);
      setSelectedFilters(checked);
   }, [filters]);

   useEffect(() => {
      const inputel = inputRef.current;
      if (filtersOpen) {
         anime({
            targets: resultRef.current,
            maxHeight: 220,
            duration: 500,
         });
      } else {
         anime({
            targets: resultRef.current,
            maxHeight: 0,
            duration: 500,
         });
         if (selectedFilters.length === 0 && inputel.value.length > 0) {
            props.toggle(inputRef.current.value);
         }
      }
   }, [filtersOpen]);

   const clearFilters = () => {
      const noSelectedFilters = filters.map((f) => ({ ...f, checked: false }));
      setFilters(noSelectedFilters);
      setFiltersOpen(false);
   };

   const onClearFilters = (e) => {
      e.stopPropagation();
      clearFilters();
   };

   return (
      <div style={{ position: 'relative' }}>
         {filtersOpen && <ClickInterceptor onClick={toggleList} />}
         <SelectedFilters
            isEmpty={selectedFilters.length === 0}
            onClick={toggleList}
         >
            {selectedFilters.length > 0 ? (
               <>
                  <FilterBadges filters={selectedFilters} />
                  <ClearSearch onClick={onClearFilters}>&times;</ClearSearch>
               </>
            ) : (
               <SearchInput
                  ref={inputRef}
                  placeholder="Sök"
                  onKeyUp={toggleList}
                  onClick={toggleList}
               />
            )}
         </SelectedFilters>
         <SearchResultContainer open={filtersOpen} ref={resultRef}>
            {filters.map((f, i) => (
               <FilterItem key={i}>
                  <Checkbox
                     label={f.value}
                     onChange={onCheckboxClick(f)}
                     checked={f.checked}
                  />
               </FilterItem>
            ))}
         </SearchResultContainer>
      </div>
   );
};

export default Filter;
