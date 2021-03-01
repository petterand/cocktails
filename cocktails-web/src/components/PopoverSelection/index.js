import ImageAlternatives from '../ImageAlternatives';
import { useEffect, useRef, useState } from 'react';
import Popover from '../Popover';
import styled from 'styled-components';
import onClickOutside from '../../common/onClickOutside';
import Icon from '../Icon';

const IconWrapper = styled.div`
   width: 32px;
   height: 32px;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 4px;
   ${(props) => !props.hasValue && 'opacity: .5;'}
   > img {
      height: 100%;
      width: auto;
   }
`;

const PopoverSelection = (props) => {
   const ref = useRef(null);
   const [refElem, setRefElem] = useState(null);
   const [showPopper, setShowPopper] = useState(false);
   const [activeAlternative, setActiveAlternative] = useState(null);
   const { alternatives } = props;
   const defaultAlternative = alternatives[0];

   useEffect(() => {
      setActiveAlternative(alternatives.find((a) => a.value === props.value));
   }, [props.value]);

   useEffect(() => {
      let remove;
      if (showPopper) {
         remove = onClickOutside(ref.current, () => {
            setShowPopper(false);
         });
      }

      return () => remove && remove();
   }, [showPopper]);

   const onIconClick = () => {
      setShowPopper((s) => !s);
   };

   return (
      <div ref={ref}>
         <IconWrapper
            ref={setRefElem}
            onClick={onIconClick}
            hasValue={Boolean(activeAlternative)}
         >
            <Icon
               icon={activeAlternative?.value || defaultAlternative?.value}
            />
         </IconWrapper>

         <Popover
            show={showPopper}
            refElem={refElem}
            placement="top"
            onHide={() => setShowPopper(false)}
         >
            <ImageAlternatives
               alternatives={alternatives}
               onChange={props.onChange}
               value={activeAlternative?.value}
            />
         </Popover>
      </div>
   );
};

export default PopoverSelection;
