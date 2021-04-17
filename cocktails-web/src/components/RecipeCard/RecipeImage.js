import placeholderImage from '../../../images/image_placeholder.svg';
import { CocktailImages } from './styles';

const RecipeImage = ({ recipe, shouldExpand, onLoad, lazyLoad }) => {
   const { image, name } = recipe;
   let isPlaceHolder = false;
   const getImage = () => {
      if (image) {
         return `${process.env.IMAGE_BASE}${image}`;
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
            crossOrigin="anonymous"
            loading="lazy"
         />
         <img
            src={getImage()}
            className={isPlaceHolder ? 'placeholder' : ''}
            alt={`Image ${name}`}
            onLoad={onLoad}
            crossOrigin="anonymous"
            loading={lazyLoad ? 'lazy' : 'eager'}
         />
      </CocktailImages>
   );
};
export default RecipeImage;
