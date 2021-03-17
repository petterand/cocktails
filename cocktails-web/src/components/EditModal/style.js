import styled from 'styled-components';

export const EditTextBox = styled.textarea`
   border: none;
   outline: none;
   flex: 1;
   font-family: 'Ubuntu', sans-serif;
   font-size: 16px;
   width: 100%;
   height: 100%;
   resize: none;
   padding: 8px;
   pointer-events: unset;
`;

export const Wrapper = styled.div`
   min-height: 300px;
   display: flex;
   flex-direction: column;
   width: calc(90vw - 32px);

   @media screen and (min-width: 540px) {
      max-width: 700px;
   }
`;

export const ButtonWrapper = styled.div`
   border-top: 1px solid var(--timber-wolf);
   padding-top: 8px;
   display: flex;
   > button {
      margin-left: auto;
   }
`;

export const ImageRow = styled.div`
   height: 50px;
   margin-bottom: 8px;
   margin-top: 16px;
   display: flex;
   * {
      pointer-events: unset;
   }
`;

export const RemoveWrapper = styled.div`
   height: 32px;
   width: 32px;
   padding: 6px;
   > img {
      height: 100%;
   }
`;

export const HasBeenMade = styled.div`
   height: 32px;
   width: 32px;
   padding: 6px 4px 4px;
   cursor: pointer;

   ${(props) => !props.active && 'opacity: .2;'}

   > img {
      height: 100%;
   }
`;
