import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
   position: relative;
   width: 100%;
   display: grid;
   grid-template-columns: repeat(var(--list-columns), minmax(0, 1fr));
   column-gap: 16px;
`;

const getColumns = (children) => {
   const items = [...children];
   const columns = new Array(2);

   for (let i = 0; i < items.length; i++) {
      const colIndex = i % 2;
      if (!columns[colIndex]) {
         columns[colIndex] = [];
      }
      columns[colIndex].push(items[i]);
   }

   return columns;
};

const renderChildren = (props) => {
   const cols = getColumns(props.children);

   return cols.map((items, i) => <div key={i}>{items}</div>);
};

const CascadingGrid = (props) => {
   const containerRef = useRef(null);

   return (
      <GridContainer gutter={props.gutter} ref={containerRef}>
         {renderChildren(props)}
      </GridContainer>
   );
};

CascadingGrid.defaultProps = {
   gutter: 0,
};

export default CascadingGrid;
