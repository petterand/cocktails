import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { uploadImage } from '../../common/api';
import processRecipe from '../../common/processRecipe/processRecipe';
import { Divider } from '../../common/styles';
import { useModalContext } from '../../contextProviders/modalContext';
import { useRecipeContext } from '../../contextProviders/recipeContext';
import { useToastContext } from '../../contextProviders/toastContext';
import Button from '../Button';
import ConditionalRender from '../ConditionalRender';
import FileDrop from '../FileDrop';
import Preparation from '../Preparation';
import ServingStyle from '../ServingStyle';

const EditTextBox = styled.textarea`
   border: none;
   outline: none;
   flex: 1;
   font-family: 'Ubuntu', sans-serif;
   font-size: 16px;
   width: 100%;
   height: 100%;
   resize: none;
   padding: 8px;
`;

const Wrapper = styled.div`
   min-height: 300px;
   display: flex;
   flex-direction: column;
   width: calc(90vw - 32px);

   @media screen and (min-width: 540px) {
      max-width: 700px;
   }
`;

const ButtonWrapper = styled.div`
   border-top: 1px solid var(--timber-wolf);
   padding-top: 8px;
   display: flex;
   > button {
      margin-left: auto;
   }
`;

const ImageRow = styled.div`
   height: 50px;
   margin-bottom: 8px;
   img {
      height: 100%;
      border-radius: 2px;
   }
`;

function recipeToText(recipe) {
   return `${recipe.name}\r\n\r\n${recipe.ingredients.join('\r\n')}\r\n\r\n${
      recipe.description || ''
   }`;
}

const getImageName = (recipeName) => {
   const base = recipeName.replace(' ', '').toLowerCase();
   return {
      jpg: `${base}.jpg`,
      webp: `${base}.webp`,
   };
};

function waitForImageOnS3(filename) {
   const src = `${process.env.S3_BUCKET}${filename}`;
   return new Promise((resolve) => {
      const interval = setInterval(() => {
         const img = new Image();
         img.onload = () => {
            clearInterval(interval);
            resolve();
         };
         img.src = src;
      }, 1500);
   });
}

const EditModal = (props) => {
   const inputRef = useRef(null);
   const [preparation, setPreparation] = useState(null);
   const [servingStyle, setServingStyle] = useState(null);
   const [busy, setBusy] = useState(false);
   const [imageFile, setImageFile] = useState(null);
   const [localImage, setLocalImage] = useState(null);
   const { updateRecipe } = useRecipeContext();
   const { closeModal } = useModalContext();
   const { showToast } = useToastContext();

   useEffect(() => {
      setPreparation(props.value.preparation);
      setServingStyle(props.value.servingStyle);
   }, [props.value]);

   const onSave = async () => {
      try {
         setBusy(true);
         const recipe = {
            ...props.value,
            preparation,
            servingStyle,
            ...processRecipe(inputRef.current.value),
         };
         if (imageFile) {
            const imageName = getImageName(recipe.name);
            await uploadImage(imageFile, imageName.jpg);
            await waitForImageOnS3(imageName.webp);
            recipe.image = imageName.webp;
         }
         await updateRecipe(recipe);

         setBusy(false);
         closeModal();
      } catch (e) {
         showToast({
            text: `Det gick inte att uppdatera ${props.value.name}`,
            variant: 'error',
            data: e.message,
         });
         setBusy(false);
         console.error(e);
      }
   };

   const handleFile = async (image, file) => {
      setLocalImage(image);
      setImageFile(file);
   };

   return (
      <Wrapper>
         <FileDrop onFileReceived={handleFile}>
            <EditTextBox
               defaultValue={recipeToText(props.value)}
               ref={inputRef}
            />
            <ConditionalRender predicate={localImage}>
               <ImageRow>
                  <img src={localImage} />
               </ImageRow>
            </ConditionalRender>
         </FileDrop>
         <ButtonWrapper>
            <Preparation onChange={setPreparation} value={preparation} />
            <Divider />
            <ServingStyle onChange={setServingStyle} value={servingStyle} />
            <Button variant="primary" onClick={onSave} busy={busy}>
               Spara
            </Button>
         </ButtonWrapper>
      </Wrapper>
   );
};

export default EditModal;
