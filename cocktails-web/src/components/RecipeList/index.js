import { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import useDeviceSize from '../../common/useDeviceSize';
import Loading from '../Loading';
import SuspenseFallback from '../SuspenseFallback';

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

   return (
      <RecipeListWrapper>
         <Suspense fallback={<Loading />}>
            <CascadingGrid noCols={noCols}>
               {props.recipes.map((recipe, i) => (
                  <RecipeCard key={recipe.id} recipeIndex={i} recipe={recipe} />
               ))}
            </CascadingGrid>
         </Suspense>
      </RecipeListWrapper>
   );
};

export default RecipeList;
