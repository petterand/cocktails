import { useRef } from 'react';
import styled from 'styled-components';
import picture from '../../../images/picture.svg';

const Input = styled.input`
   display: none;
`;

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   margin-left: 8px;
`;

const Label = styled.label`
   height: 24px;
   width: 24px;
   padding: 2px;
   cursor: pointer;
`;

const FileInput = (props) => {
   const ref = useRef(null);
   const onChange = (e) => {
      const files = e.target.files;
      const file = files[0];
      if (file && file.type === 'image/jpeg') {
         const reader = new FileReader();
         reader.onload = (e) => props.onFileReceived(e.target.result, file);
         reader.readAsDataURL(file);
      }
      e.target.value = '';
   };

   return (
      <Wrapper>
         <Label htmlFor="fileinput">
            <img src={picture} />
         </Label>
         <Input
            type="file"
            accept="image/jpeg"
            id="fileinput"
            onChange={onChange}
            ref={ref}
         />
      </Wrapper>
   );
};

export default FileInput;
