import styled, { css } from 'styled-components';

export const ClickInterceptor = styled.div`
   position: fixed;
   top: 65px;
   left: 0;
   right: 0;
   bottom: 0;
   z-index: 98;
`;

const openSearchResultStyle = css`
   padding: 8px 8px 8px 0px;
`;

interface ResultProps {
   readonly open: boolean;
}

export const SearchResultContainer = styled.div<ResultProps>`
   overflow: hidden;
   top: 48px;
   position: absolute;
   max-height: 0;

   left: -24px;
   right: -8px;
   border-left: 16px solid var(--aero-blue);
   border-top: none;
   background: white;
   overflow-y: scroll;
   box-shadow: 0 8px 6px -6px #0000004a;
   z-index: 99;
   ${(props) => props.open && openSearchResultStyle}
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

export const Input = styled.input`
   border: 1px solid var(--battleship-grey);
   font-size: 16px;
   outline: none;
   background: #fff;
   padding: 8px 4px;
   font-size: 0.85rem;
`;

export const Button = styled.button`
   border: none;
   border-radius: 4px;
   background-color: var(--viridian);
   color: #fff;
   padding: 8px 16px;
   font-size: 0.85rem;
`;
