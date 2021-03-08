import { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import useDeviceSize from '../../common/useDeviceSize';
import Loading from '../Loading';

const RecipeListWrapper = styled.div`
   margin: 16px auto 0;
   max-width: 780px;
`;

const RecipeCard = lazy(() => import('../RecipeCard'));
const CascadingGrid = lazy(() => import('../CascadingGrid'));

const RecipeList = (props) => {
   const [noCols, setNoCols] = useState(3);

   const deviceSize = useDeviceSize();

   useEffect(() => {
      setNoCols(deviceSize === 'small' ? 2 : 3);
   }, [deviceSize]);

   const sortRecipes = (a, b) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      if (a < b) {
         return -1;
      } else if (a > b) {
         return 1;
      } else {
         return 0;
      }
   };

   const sorted = props.recipes.sort(sortRecipes);

   return (
      <RecipeListWrapper>
         <Suspense fallback={<Loading />}>
            <CascadingGrid noCols={noCols}>
               {sorted.map((recipe, i) => (
                  <RecipeCard key={recipe.id} recipeIndex={i} recipe={recipe} />
               ))}
            </CascadingGrid>
         </Suspense>
      </RecipeListWrapper>
   );
};

export default RecipeList;
