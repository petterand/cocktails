import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Text = styled.p`
   overflow: hidden;
   height: 0;

   transition: height 0.2s;
   text-align: center;
   font-size: 0.8rem;
   font-style: italic;
   line-height: 3rem;
   ${(props) => props.show && 'height: 2rem;'}
`;

const NoSearchResult = (props) => {
   const [show, setShow] = useState(false);
   useEffect(() => {
      setShow(props.show);
   }, [props.show]);

   useEffect(() => {
      let timeout = null;
      if (show) {
         timeout = setTimeout(() => {
            setShow(false);
            props.onHide();
         }, 2000);
      }
      return () => clearTimeout(timeout);
   }, [show]);

   return <Text show={show}>Sökningen gav inga resultat</Text>;
};

export default NoSearchResult;
