import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const AlternativesWrapper = styled.div`
   display: flex;
`;

const AlternativeWrapper = styled.div`
   --border-width: 2px;
   --icon-size: 32px;
   cursor: pointer;
   border: var(--border-width) solid transparent;
   border-radius: 4px;
   width: 32px;
   height: 32px;
   padding: 4px;
   display: flex;
   justify-content: center;
   align-items: center;
   img {
      height: 100%;
   }
   ${(props) =>
      props.selected &&
      `
      border: var(--border-width) solid var(--viridian);
   `}
`;

const Alternative = (props) => {
   const onClick = (value) => () => {
      props.onClick(value);
   };

   return (
      <AlternativeWrapper
         onClick={onClick(props.value)}
         selected={props.selected}
      >
         {props.children}
      </AlternativeWrapper>
   );
};

const ImageAlternatives = (props) => {
   const [selected, setSelected] = useState(null);

   const onChange = (value) => {
      setSelected(value);
      props.onChange(value);
   };

   useEffect(() => {
      setSelected(props.value);
   }, [props.value]);

   return (
      <AlternativesWrapper>
         {props.alternatives.map((a, i) => (
            <Alternative
               key={i}
               value={a.value}
               onClick={onChange}
               selected={selected === a.value}
            >
               <Icon icon={a.value} />
            </Alternative>
         ))}
      </AlternativesWrapper>
   );
};

ImageAlternatives.defaultProps = {
   onChange: () => {},
};

export default ImageAlternatives;
