import styled, { css } from 'styled-components';
import ConditionalRender from '../ConditionalRender';
import Spinner from '../Spinner';

const primaryButton = css`
   background-color: var(--viridian);
   border: none;
   color: #fff;
`;

const secondaryButton = css`
   color: var(---viridian);
   border: 1px solid var(---viridian);
   background-color: #fff;
`;

const ButtonElem = styled.button`
   border-radius: 4px;
   padding: 8px 16px;
   font-weight: bold;
   ${(props) =>
      props.variant === 'secondary' ? secondaryButton : primaryButton}
   .spinner {
      margin-right: 4px;
   }
   &:disabled {
      opacity: 0.6;
   }
`;

const Button = (props) => {
   return (
      <ButtonElem {...props} disabled={props.busy || props.disabled}>
         <ConditionalRender predicate={props.busy}>
            <Spinner size="sm" className="spinner" />
         </ConditionalRender>
         {props.children}
      </ButtonElem>
   );
};

export default Button;
