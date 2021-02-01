import styled from 'styled-components';

export const SearchWrapper = styled.div`
   display: flex;
   height: 35px;
   position: relative;
`;

export const SearchInput = styled.input`
   border: none;
   flex-grow: 1;
   padding: 8px;
   padding-left: 0;
   font-family: inherit;
   font-weight: 100;
   font-size: 1rem;
   &:focus {
      outline: none;
   }
   &::placeholder {
      color: var(--placeholder);
   }
`;

export const SearchResultItem = styled.div`
   padding: 8px;
   padding-left: 16px;
   background-color: ${(props) =>
      props.selected ? 'var(--aero-blue)' : 'white'};
   &:hover {
      background-color: var(--aero-blue);
   }
`;
