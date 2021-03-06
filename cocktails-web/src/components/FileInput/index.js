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
`;

const FileInput = (props) => {
   const onChange = (e) => {
      const files = e.target.files;
      const file = files[0];
      if (file && file.type === 'image/jpeg') {
         const reader = new FileReader();
         reader.onload = (e) => props.onFileReceived(e.target.result, file);
         reader.readAsDataURL(file);
      }
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
         />
      </Wrapper>
   );
};

export default FileInput;
