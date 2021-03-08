import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
   position: relative;
   width: 100%;
   display: grid;
   grid-template-columns: repeat(var(--list-columns), minmax(0, 1fr));
   column-gap: 16px;
`;

const getColumns = (children, noCols) => {
   const items = [...children];
   const columns = new Array(noCols);

   for (let i = 0; i < items.length; i++) {
      const colIndex = i % noCols;
      if (!columns[colIndex]) {
         columns[colIndex] = [];
      }
      columns[colIndex].push(items[i]);
   }

   return columns;
};

const renderChildren = (props) => {
   const cols = getColumns(props.children, props.noCols);

   return cols.map((items, i) => <div key={i}>{items}</div>);
};

const CascadingGrid = (props) => {
   return <GridContainer>{renderChildren(props)}</GridContainer>;
};

export default CascadingGrid;
