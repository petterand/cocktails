import { useState } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import ConditionalRender from '../ConditionalRender';

const PopperElement = styled.div`
   background: white;
   border: 1px solid var(--timber-wolf);
   padding: 4px;
   outline: none;

   .popper-arrow,
   .popper-arrow::before {
      position: absolute;
      width: 8px;
      height: 8px;
      background: white;
      border-bottom: 1px solid var(--timber-wolf);
      border-right: 1px solid var(--timber-wolf);
      bottom: -3px;
   }
   .popper-arrow {
      visibility: hidden;
      z-index: -1;
      &::before {
         content: '';
         visibility: visible;
         transform: rotate(45deg);
      }
   }
`;

const Content = (props) => {
   const [popperElem, setPopperElem] = useState(null);
   const [arrowElem, setArrowElem] = useState(null);
   const { styles, attributes } = usePopper(props.refElem, popperElem, {
      placement: props.placement,
      modifiers: [
         { name: 'offset', options: { offset: [16, 10] } },
         { name: 'arrow', options: { element: arrowElem } },
      ],
   });

   return (
      <PopperElement
         ref={setPopperElem}
         style={styles.popper}
         {...attributes.popper}
      >
         {props.children}
         <div
            className="popper-arrow"
            ref={setArrowElem}
            style={styles.arrow}
         />
      </PopperElement>
   );
};

const Popover = (props) => {
   return (
      <ConditionalRender predicate={props.show}>
         <Content {...props} />
      </ConditionalRender>
   );
};

export default Popover;
