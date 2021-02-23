import React from 'react';
import styled from 'styled-components';

const BounceBall = styled.div`
   width: 15px;
   height: 40px;
   position: relative;
   margin: 0 auto;

   &:after {
      content: '';
      display: block;
      background: #b8f2e6ff;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      position: absolute;
      top: 0;
      animation: bounce 0.5s alternate infinite ease;
   }

   @keyframes bounce {
      0% {
         top: 30px;
         transform: scaleX(2);
         border-radius: 60px 60px 20px 20px;
         height: 10px;
      }
      35% {
         height: 20px;
         border-radius: 50%;
         transform: scaleX(1);
      }
      100% {
         top: 0;
      }
   }
`;

const Loading = () => {
   return <BounceBall />;
};

export default Loading;
