import styled from 'styled-components';

export const Wrapper = styled.div`
   position: fixed;
   top: 16px;
   bottom: 16px;
   background-color: white;
   z-index: 999;
   border: 1px solid #e0e0e0;
   padding: 32px 16px 16px;
   border-left: 6px solid var(--aero-blue);
   left: 50%;
   max-width: 700px;
   transform: translateX(-50%);
   width: 90%;

   div.main-image {
      margin: -32px -16px 16px;
      height: 45%;
      position: relative;
      display: flex;
      overflow: hidden;
      img {
         height: 100%;
         margin: 0 auto;
         &.blur-image {
            width: 100%;
            position: absolute;
            z-index: -1;
            filter: blur(1.5rem);
         }
      }
   }
`;

export const CloseButton = styled.span`
   font-size: 32px;
   position: absolute;
   top: 16px;
   right: 16px;
   line-height: 12px;
   cursor: pointer;
   z-index: 99;
`;

export const Ingredients = styled.ul`
   margin-top: 24px;
   list-style-type: none;
`;

export const Instructions = styled.p`
   margin-top: 32px;
`;

export const InfoRow = styled.div`
   display: flex;
   align-items: center;
   margin-top: 16px;
   > span {
      font-size: 12px;
   }
   > img {
      margin-right: 4px;
      &:first-of-type {
         height: 32px;
      }
      &:last-of-type {
         margin-left: 16px;
         height: 20px;
      }
   }
   &.stir {
      > img {
         &:first-of-type {
            margin-bottom: 8px;
         }
      }
   }
`;

export const ToolsWrapper = styled.div`
   display: flex;
   margin-left: 16px;
   > div {
      cursor: pointer;
      &:not(last-child) {
         margin-right: 16px;
      }
      img {
         width: 20px;
         height: 20px;
      }
   }
`;

export const Header = styled.div`
   display: flex;
   align-items: center;
`;
