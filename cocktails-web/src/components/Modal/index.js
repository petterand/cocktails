import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background-color: #00000080;
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 999;
`;

const ModalContent = styled.div`
   background-color: #fff;
   width: 200px;
   padding: 16px;
`;

const Modal = (props) => {
   return (
      <ModalWrapper>
         <ModalContent>{props.children}</ModalContent>
      </ModalWrapper>
   );
};

export default Modal;
