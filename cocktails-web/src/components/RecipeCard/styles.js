import styled from 'styled-components';
export const RecipeContent = styled.div`
   border: 1px solid #e0e0e0;
   border-left: 3px solid var(--aero-blue);
   padding: 16px;
   margin-bottom: 16px;
   background-color: white;
   z-index: 2;
   position: relative;

   > div {
      white-space: pre-line;
   }
   > p:first-child {
      font-weight: bold;
      margin-bottom: 8px;
      font-size: 1.1rem;
      text-transform: capitalize;
   }
   > ul {
      margin: 16px 0 8px 0;
      list-style-type: none;
      padding: 0;
   }
`;

export const Card = styled.div`
   position: relative;
`;

export const BackMenu = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: var(--viridian);
   z-index: 1;
   display: flex;
   > div {
      width: 50px;
      margin-left: auto;
      padding: 8px 12px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      > div {
         margin-top: 12px;
         > img {
            &:hover {
               border: 1px solid white;
            }
         }
      }
   }
`;

export const Icon = styled.img`
   width: 100%;
   height: auto;
   display: block;
`;
