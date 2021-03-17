import { useEffect, useRef, useState } from 'react';
import { deleteImage, uploadImage } from '../../common/api';
import processRecipe from '../../common/processRecipe/processRecipe';
import { Divider } from '../../common/styles';
import { useModalContext } from '../../contextProviders/modalContext';
import { useRecipeContext } from '../../contextProviders/recipeContext';
import { useToastContext } from '../../contextProviders/toastContext';
import removeIcon from '../../../images/remove.svg';
import Button from '../Button';
import ConditionalRender from '../ConditionalRender';
import FileDrop from '../FileDrop';
import FileInput from '../FileInput';
import Preparation from '../Preparation';
import ServingStyle from '../ServingStyle';
import PreviewImage from './PreviewImage';
import {
   ButtonWrapper,
   EditTextBox,
   ImageRow,
   RemoveWrapper,
   Wrapper,
} from './style';
import ConfirmModal from '../ConfirmModal';
import navigate from '../../common/navigate';

function recipeToText(recipe) {
   return `${recipe.name}\r\n\r\n${recipe.ingredients.join('\r\n')}\r\n\r\n${
      recipe.description || ''
   }`;
}

const getImageName = (recipeName) => {
   const base = recipeName.replace(/\s/g, '').toLowerCase();
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
         img.crossOrigin = 'anonymous';
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
   const [shouldDeleteImage, setShouldDeleteImage] = useState(false);
   const { updateRecipe, removeRecipe } = useRecipeContext();
   const { closeModal, openModal } = useModalContext();
   const { showToast } = useToastContext();

   const recipe = props.value;

   useEffect(() => {
      setPreparation(recipe.preparation);
      setServingStyle(recipe.servingStyle);
   }, [recipe]);

   const onRemove = (id) => async () => {
      const remove = async () => {
         await removeRecipe(id);
         navigate('');
      };
      openModal({
         body: (
            <ConfirmModal onPrimary={remove}>
               Är du säker på att du vill ta bort receptet?
            </ConfirmModal>
         ),
      });
   };

   const onSave = async () => {
      try {
         setBusy(true);
         const newRecipe = {
            ...recipe,
            preparation,
            servingStyle,
            ...processRecipe(inputRef.current.value),
         };
         if (shouldDeleteImage) {
            await deleteImage(newRecipe.image);
            newRecipe.image = '';
         }
         if (imageFile) {
            const imageName = getImageName(newRecipe.name);
            await uploadImage(imageFile, imageName.jpg);
            await waitForImageOnS3(imageName.webp);
            newRecipe.image = imageName.webp;
         }
         await updateRecipe(newRecipe);

         setBusy(false);
         closeModal();
      } catch (e) {
         showToast({
            text: `Det gick inte att uppdatera ${recipe.name}`,
            variant: 'error',
            data: e.message,
         });
         setBusy(false);
         console.error(e);
      }
   };

   const handleFile = async (image, file) => {
      if (recipe.image) {
         setShouldDeleteImage(true);
      }
      setLocalImage(image);
      setImageFile(file);
   };

   const onDeleteImage = async () => {
      if (recipe.image) {
         setShouldDeleteImage(true);
      }
      if (localImage) {
         setLocalImage(null);
         setImageFile(null);
      }
   };

   const getImage = () => {
      if (shouldDeleteImage && !localImage) {
         return null;
      }
      if (recipe.image) {
         return `${process.env.S3_BUCKET}${recipe.image}`;
      }
      if (localImage) {
         return localImage;
      }
   };

   const image = getImage();

   return (
      <Wrapper>
         <FileDrop onFileReceived={handleFile}>
            <EditTextBox defaultValue={recipeToText(recipe)} ref={inputRef} />
         </FileDrop>
         <ConditionalRender predicate={image}>
            <ImageRow>
               <PreviewImage image={image} onDeleteImage={onDeleteImage} />
            </ImageRow>
         </ConditionalRender>
         <ButtonWrapper>
            <Preparation onChange={setPreparation} value={preparation} />
            <Divider />
            <ServingStyle onChange={setServingStyle} value={servingStyle} />
            <Divider />
            <FileInput onFileReceived={handleFile} />
            <Divider />
            <RemoveWrapper onClick={onRemove(recipe.id)}>
               <img src={removeIcon} />
            </RemoveWrapper>
            <Button variant="primary" onClick={onSave} busy={busy}>
               Spara
            </Button>
         </ButtonWrapper>
      </Wrapper>
   );
};

export default EditModal;
