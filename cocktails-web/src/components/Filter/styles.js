import styled from 'styled-components';

export const SelectedFilters = styled.div`
   margin: ${(props) => props.foo};
   padding-left: 0;
   height: 35px;
   font-family: inherit;
   font-weight: 100;
   font-size: 1rem;
   display: flex;
`;

export const FilterItem = styled.div`
   padding: 8px 16px;
   text-transform: capitalize;
`;

export const BadgeList = styled.div`
   display: flex;
`;

export const BadgeItem = styled.div`
   background-color: var(--viridian);
   border-radius: 8px;
   color: white;
   padding: 8px;
   margin-right: 8px;
   text-transform: capitalize;
`;
