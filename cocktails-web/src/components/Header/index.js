import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import anime from 'animejs/lib/anime.es.js';
import SearchAndFilter from '../SearchAndFilter';
import signinIcon from '../../../images/signin.svg';
import signoutIcon from '../../../images/signout.svg';
import randomIcon from '../../../images/random.svg';
import { useModalContext } from '../../contextProviders/modalContext';
import SignInModalBody from '../SignInModal';
import useDeviceSize from '../../common/useDeviceSize';
import { useUserContext } from '../../contextProviders/userContext';
import ConditionalRender from '../ConditionalRender';

const Header = (props) => {
   const headerRef = useRef(null);
   const [menuVisible, setMenuVisible] = useState(false);
   const deviceSize = useDeviceSize();

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

   const setHandler = (handler) =>
      deviceSize === 'small' ? handler : () => {};

   const onMenuClick = () => {
      animate(0);
      setMenuVisible(false);
   };

   const onInputFocus = () => {
      animate(0);
      setMenuVisible(false);
   };

   return (
      <HeaderWrapper>
         <Menu
            onRandomize={props.onRandomize}
            onClick={setHandler(onMenuClick)}
         />
         <HeaderElement
            ref={headerRef}
            onTouchStart={setHandler(touchStart)}
            onTouchMove={setHandler(touchMove)}
            onTouchEnd={setHandler(touchEnd)}
         >
            <SearchAndFilter
               {...props}
               menuVisible={menuVisible}
               onFocus={onInputFocus}
            />
         </HeaderElement>
      </HeaderWrapper>
   );
};

const Menu = (props) => {
   const { openModal } = useModalContext();
   const { isSignedIn, signOut } = useUserContext();

   const signIn = (e) => {
      e.stopPropagation();
      openModal({ body: <SignInModalBody /> });
   };

   const randomize = (e) => {
      e.stopPropagation();
      props.onRandomize();
   };

   const SignIn = () => (
      <MenuItem onClick={signIn}>
         <img src={signinIcon} alt="sign in" width="32px" height="32px" />
      </MenuItem>
   );

   const SignOut = () => (
      <MenuItem onClick={signOut}>
         <img src={signoutIcon} alt="sign out" width="40px" height="32px" />
      </MenuItem>
   );

   return (
      <HeaderMenu onClick={props.onClick}>
         <ConditionalRender predicate={isSignedIn} fallback={<SignIn />}>
            <SignOut />
         </ConditionalRender>
         <MenuItem onClick={randomize}>
            <img
               src={randomIcon}
               alt="random icon"
               width="32px"
               height="32px"
            />
         </MenuItem>
      </HeaderMenu>
   );
};

const MenuItem = styled.div`
   width: 32px;
   height: 32px;
   cursor: pointer;
   &:not(:last-child) {
      margin-right: 16px;
   }
`;

const HeaderWrapper = styled.div`
   position: relative;
   @media screen and (min-width: 540px) {
      display: flex;
   }
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
   z-index: 3;

   @media screen and (min-width: 540px) {
      position: static;
      border-bottom: 1px solid var(--aero-blue);
      width: 100%;
      padding-right: 32px;
   }
`;

export default Header;
