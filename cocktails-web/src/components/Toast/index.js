import styled, { css } from 'styled-components';
import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useToastContext } from '../../contextProviders/toastContext';
import ConditionalRender from '../ConditionalRender';

const getToastStyle = (variant) => {
   const map = {
      info: css`
         border-color: #cdcdcd;
         background-color: var(--toast-grey);
         color: var(--black-coral);
      `,
      error: css`
         border-color: #bb0000;
         background-color: var(--toast-red);
         color: #bb0000;
      `,
      success: css`
         border-color: green;
         background-color: var(--toast-green);
         color: green;
      `,
   };

   return map[variant] || map['info'];
};

const ReadDetails = styled.p`
   text-decoration: underline;
   cursor: pointer;
   margin-top: 4px;
`;

const Details = styled.p`
   margin-top: 4px;
`;

const Data = (props) => {
   if (!props.data) {
      return null;
   }

   return (
      <ConditionalRender
         predicate={props.showData}
         fallback={
            <ReadDetails onClick={props.onReadDetails}>
               Läs detaljer
            </ReadDetails>
         }
      >
         <Details>{props.data}</Details>
      </ConditionalRender>
   );
};

const ToastElement = styled.div`
   position: fixed;
   top: ${(props) => (props.show ? '16px' : '-100px')};
   width: 90%;
   left: 50%;
   transform: translateX(-50%);
   max-width: 400px;
   z-index: 1000;
   padding: 16px 32px 16px 24px;
   border-radius: 4px;
   font-size: 12px;
   display: flex;
   align-items: center;
   transition: top 1s;
   border: 1px solid;
   ${(props) => getToastStyle(props.variant)}
`;

const CloseButton = styled.span`
   position: absolute;
   right: 16px;
   font-size: 18px;
`;

const Toast = (props) => {
   const { hideToast } = useToastContext();
   const [show, setShow] = useState(false);
   const [showData, setShowData] = useState(false);
   const ref = useRef(null);
   const [hideTimer, setHideTimer] = useState(null);

   const onTransitionEnd = (e) => {
      const style = getComputedStyle(e.target);
      if (parseInt(style.top) < 0) {
         hideToast(props.id);
      }
   };

   const onReadDetails = () => {
      clearTimeout(hideTimer);
      setShowData(true);
   };

   const closeToast = () => {
      setShowData(false);
      setShow(false);
   };

   useEffect(() => {
      const timer = setTimeout(() => {
         setShow(true);
      }, 500);

      return () => clearTimeout(timer);
   }, []);

   useEffect(() => {
      ref?.current?.addEventListener('transitionend', onTransitionEnd);

      return () =>
         ref?.current?.removeEventListener('transitionend', onTransitionEnd);
   }, []);

   useEffect(() => {
      if (!props.stayOpen) {
         const timer = setTimeout(() => {
            closeToast();
         }, props.timeout || 10000);
         setHideTimer(timer);
      }
      return () => {
         clearTimeout(hideTimer);
      };
   }, [props.stayOpen]);

   return ReactDOM.createPortal(
      <ToastElement ref={ref} show={show} variant={props.variant}>
         <CloseButton onClick={closeToast}>&times;</CloseButton>
         <div>
            {props.text}
            <Data
               data={props.data}
               showData={showData}
               onReadDetails={onReadDetails}
            />
         </div>
      </ToastElement>,
      document.querySelector('body')
   );
};

export default Toast;
