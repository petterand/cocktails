import React from 'react';
import styled from 'styled-components';
const Checkbox = (props) => {
   return (
      <CheckboxLabel>
         <input
            type="checkbox"
            checked={props.checked}
            onChange={props.onChange}
         />
         <span>
            <svg width="12px" height="9px" viewBox="0 0 12 9">
               <polyline points="1 5 4 8 11 1"></polyline>
            </svg>
         </span>
         <span>{props.label}</span>
      </CheckboxLabel>
   );
};

const CheckboxLabel = styled.label`
   display: flex;
   align-items: center;

   > input {
      display: none;
   }
   > span:first-of-type {
      border: 1px solid var(--powder-blue);
      border-radius: 50%;
      width: 24px;
      height: 24px;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      svg {
         position: absolute;
         top: 7px;
         left: 5px;
         fill: none;
         stroke: white;
         stroke-width: 2px;
         stroke-linecap: round;
         stroke-linejoin: round;
         stroke-dasharray: 16px;
         stroke-dashoffset: 16px;
         transition: all 0.3s ease;
         transition-delay: 0.1s;
      }
   }
   > span:last-of-type {
      margin-left: 8px;
   }
   > input:checked + span:first-of-type {
      background-color: var(--powder-blue);
      svg {
         stroke-dashoffset: 0;
      }
   }
`;

export default Checkbox;
