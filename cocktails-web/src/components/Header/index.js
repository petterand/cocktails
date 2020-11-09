import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import anime from 'animejs/lib/anime.es.js';
import SearchAndFilter from '../SearchAndFilter';
import signinIcon from '../../../images/signin.svg';
import { useModalContext } from '../../contextProviders/modalContext';
import SignInModalBody from '../SignInModal';

const Header = (props) => {
   const headerRef = useRef(null);
   const [menuVisible, setMenuVisible] = useState(false);

   const animate = async (val) =>
      anime({
         targets: headerRef.current,
         translateX: val,
         duration: 300,
      });

   const touchStart = (e) => {
      e.target.dataset.x =
         Number(e.touches[0].pageX) + Number(e.target.dataset.move || 0);
   };

   const touchMove = (e) => {
      let moveX = Number(e.target.dataset.x) + e.touches[0].pageX;

      if (moveX > 250) {
         moveX = 250;
      }
      if (moveX < 0) {
         moveX = 0;
      }
      e.target.dataset.move = moveX;

      animate(Number(e.target.dataset.move));
   };

   const touchEnd = (e) => {
      if (e.target.dataset.move > 0) {
         e.target.dataset.move = 0;
         animate(250);
         setMenuVisible(true);
      }
   };

   return (
      <HeaderWrapper>
         <Menu onClick={(e) => animate(0)} />
         <HeaderElement
            ref={headerRef}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
         >
            <SearchAndFilter {...props} menuVisible={menuVisible} />
         </HeaderElement>
      </HeaderWrapper>
   );
};

const Menu = (props) => {
   const { openModal } = useModalContext();
   const signIn = (e) => {
      e.stopPropagation();
      openModal({ body: <SignInModalBody /> });
   };
   return (
      <HeaderMenu onClick={props.onClick}>
         <MenuItem onClick={signIn}>
            <img src={signinIcon} alt="sign in" width="32px" height="32px" />
         </MenuItem>
      </HeaderMenu>
   );
};

const MenuItem = styled.div`
   width: 32px;
   height: 32px;
   cursor: pointer;
`;

const HeaderWrapper = styled.div`
   position: relative;
`;

const HeaderMenu = styled.div`
   background-color: var(--viridian);
   height: 67px;
   display: flex;
   align-items: center;
   padding: 0 16px;
`;

const HeaderElement = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   display: flex;
   flex-direction: column;
   justify-content: center;
   border-left: 16px solid var(--aero-blue);
   background-color: #fff;
   height: 67px;
   padding: 0 8px;
`;

export default Header;
