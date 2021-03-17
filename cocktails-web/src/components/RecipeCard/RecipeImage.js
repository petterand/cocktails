import placeholderImage from '../../../images/image_placeholder.svg';
import { CocktailImages } from './styles';

const RecipeImage = ({ recipe, shouldExpand, onLoad }) => {
   const { image, name } = recipe;
   let isPlaceHolder = false;
   const getImage = () => {
      if (image) {
         return `${process.env.S3_BUCKET}${image}`;
      }
      isPlaceHolder = true;
      return placeholderImage;
   };

   return (
      <CocktailImages shouldExpand={shouldExpand}>
         <img
            src={getImage()}
            alt={`Blurred image ${name}`}
            className="blurred-image"
         />
         <img
            src={getImage()}
            className={isPlaceHolder ? 'placeholder' : ''}
            alt={`Image ${name}`}
            onLoad={onLoad}
         />
      </CocktailImages>
   );
};
export default RecipeImage;
