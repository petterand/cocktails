import styled, { keyframes, css } from 'styled-components';

const spin = keyframes`
0% {
   transform: rotate(0deg)
 }
 100% {
   transform: rotate(360deg);
 }
`;

const getSize = (size) => {
   const map = {
      sm: css`
         width: 10px;
         height: 10px;
         border-width: 2px;
      `,
      md: css`
         width: 20px;
         height: 20px;
      `,
      lg: css`
         width: 30px;
         height: 30px;
      `,
   };
   return map[size] || '';
};

const SpinnerElem = styled.span`
   display: inline-block;
   border: 5px solid #dedbd2ff;
   border-top: 5px solid #ffa69eff;
   border-left: 5px solid #ffa69eff;
   border-radius: 100%;
   ${(props) => getSize(props.size)}
   animation: ${spin} 1s alternate infinite ease;
`;

const Spinner = (props) => <SpinnerElem {...props} />;

export default Spinner;
