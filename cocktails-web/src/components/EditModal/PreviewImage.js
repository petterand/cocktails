import styled from 'styled-components';

const ImageWrapper = styled.div`
   height: 100%;
   position: relative;
   img {
      height: 100%;
      border-radius: 2px;
   }
   span {
      position: absolute;
      background: var(--timber-wolf);
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      top: -10px;
      right: -10px;
      cursor: pointer;
   }
`;

const PreviewImage = (props) => {
   return (
      <ImageWrapper>
         <img src={props.image} />
         <span onClick={props.onDeleteImage}>&times;</span>
      </ImageWrapper>
   );
};

export default PreviewImage;
