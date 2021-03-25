import styled from 'styled-components';

export const CocktailImages = styled.div`
   position: relative;
   overflow: hidden;
   height: 70px;
   flex: 1;

   ${(props) => props.shouldExpand && `height: auto; display: block;`}

   img.blurred-image {
      display: none;
   }

   img {
      width: 100%;
      height: auto;
   }
   img:not(.placeholder) {
      transform: ${(props) =>
         props.shouldExpand ? 'none' : 'translateY(-20%)'};
   }
   img.placeholder {
      margin: 8px auto 0 auto;
      height: calc(100% - 8px);
      padding: 0 8px;
   }

   @media screen and (min-width: 540px) {
      ${(props) =>
         props.shouldExpand &&
         `
         height: 300px;
         display: flex;
         justify-content: center;

         img.placeholder {
            margin: 0 auto;
            height: 100%;
         }

         img.blurred-image {
            display: block;
            height: 100%;
            position: absolute;
            width: 100%;
            filter: blur(2.1rem);
            z-index: -1;
         }
         img {
            height: 100%;
            width: auto;
         }
      `}
   }
`;

export const Card = styled.div`
   height: 150px;
   border: 1px solid var(--timber-wolf);
   border-left: 3px solid var(--aero-blue);
   display: flex;
   flex-direction: column;
   cursor: pointer;
   overflow: hidden;
   will-change: height;
   position: relative;
   -webkit-tap-highlight-color: transparent;
   content-visibility: auto;
   contain-intrinsic-size: 150px;

   ${(props) => props.shouldExpand && `display: block;`}

   @media screen and (min-width: 540px) {
      ${(props) => props.shouldExpand && `grid-column: 1 / 3;`}
   }
`;

export const RecipeBasicInfo = styled.div`
   margin: 8px 0;
   padding: 0 8px;
   display: flex;
   align-items: center;
   > p {
      font-weight: 500;
      font-size: 1.1rem;
   }
`;

export const Icons = styled.div`
   margin-left: auto;
   display: flex;
   align-items: flex-end;
   > img {
      height: 20px;
      &:first-child {
         margin-right: 4px;
         height: 24px;
      }
   }
`;

export const RecipeDetails = styled.div`
   display: none;
   margin: 8px;
   font-size: 0.9rem;

   ${(props) => props.shouldExpand && `display: block;`}

   > ul {
      list-style: none;
      margin-bottom: 8px;
   }
   > p {
      margin-top: 8px;
      white-space: pre-wrap;
      margin-bottom: 8px;
   }
`;

export const RecipeMain = styled.div`
   z-index: 2;
   height: 100%;
   display: flex;
   flex-direction: column;
   background-color: #fff;
   position: relative;

   ${(props) => props.shouldExpand && `height: auto;`}

   &.open {
      transform: translateX(-50px);
   }
`;

export const BackMenuWrapper = styled.div`
   position: absolute;
   top: 1px;
   right: 1px;
   bottom: 1px;
   width: 50%;
   background-color: var(--viridian);
   z-index: 1;
   display: flex;
   align-items: flex-end;
   flex-direction: column;
   padding: 8px 8px 0 0;

   > div {
      width: 32px;
      height: 32px;
      padding: 4px;
      &:first-child {
         margin-bottom: 16px;
      }
      > img {
         width: 100%;
      }
   }
`;

export const MenuButton = styled.div`
   width: 42px;
   height: 42px;
   padding: 12px;
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   top: 2px;
   right: 2px;
   z-index: 3;
   border-radius: 100%;
   background-color: #ffffff55;
`;
