import styled, { css } from 'styled-components';

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

const Button = styled.button`
   border-radius: 4px;
   padding: 8px 16px;
   font-weight: bold;
   ${(props) =>
      props.variant === 'secondary' ? secondaryButton : primaryButton}
`;

export default Button;
