import React from 'react';
import styled from 'styled-components';
import SearchAndFilter from '../SearchAndFilter';

const Header = (props) => {
   return (
      <HeaderElement>
         <SearchAndFilter {...props} />
      </HeaderElement>
   );
};

const HeaderElement = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   border-left: 16px solid var(--aero-blue);
   height: 67px;
   padding: 0 8px;
`;

export default Header;
