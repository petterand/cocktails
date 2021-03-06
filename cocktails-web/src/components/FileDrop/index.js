import { useState } from 'react';
import styled, { css } from 'styled-components';
import upload from '../../../images/upload.svg';

const activeStyle = css`
   position: relative;
`;

const ActiveWrapper = styled.div`
   display: none;
   position: absolute;
   inset: 0;
   opacity: 0.8;
   background-color: #ffffffbf;
   justify-content: center;
   align-items: center;
   img {
      height: 100px;
      pointer-events: none;
   }
   ${({ isDropActive }) => isDropActive && `display: flex;`}
`;

const Wrapper = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   * {
      pointer-events: none;
   }
   ${({ isDropActive }) => isDropActive && activeStyle}
`;

const FileDrop = (props) => {
   const [isDropActive, setIsDropActive] = useState(false);
   const onDragOver = (e) => {
      e.preventDefault();
   };

   const onDragEnter = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsDropActive(true);
   };

   const onDragLeave = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsDropActive(false);
   };

   const onDrop = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsDropActive(false);
      handleFileUpload(e.dataTransfer.files);
   };

   const handleFileUpload = async (files) => {
      const file = files[0];
      if (file && file.type === 'image/jpeg') {
         const reader = new FileReader();
         reader.onload = (e) => props.onFileReceived(e.target.result, file);
         reader.readAsDataURL(file);
      }
   };
   return (
      <>
         <Wrapper
            isDropActive={isDropActive}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
         >
            {props.children}
         </Wrapper>
         <ActiveWrapper
            isDropActive={isDropActive}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onDragOver={onDragOver}
         >
            <img src={upload} />
         </ActiveWrapper>
      </>
   );
};

export default FileDrop;
