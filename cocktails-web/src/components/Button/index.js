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

const linkButton = css`
   border: none;
   background: none;
   text-decoration: underline;
   cursor: pointer;
   outline: none;
`;

const getVariantStyling = (variant) => {
   switch (variant) {
      case 'primary':
         return primaryButton;
      case 'secondary':
         return secondaryButton;
      case 'link':
         return linkButton;
      default:
         return primaryButton;
   }
};

const ButtonElem = styled.button`
   border-radius: 4px;
   padding: 8px 16px;
   font-weight: 500;
   font-family: LibreFranklin;
   ${(props) => getVariantStyling(props.variant)}
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
