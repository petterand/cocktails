import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import SuspenseFallback from '../SuspenseFallback';

const RecipeListWrapper = styled.div`
   margin-top: 32px;
`;

const RecipeCard = lazy(() => import('../RecipeCard'));
const CascadingGrid = lazy(() => import('../CascadingGrid'));

const RecipeList = (props) => {
   return (
      <RecipeListWrapper>
         <Suspense fallback={<SuspenseFallback />}>
            <CascadingGrid>
               {props.recipes.map((recipe, i) => (
                  <RecipeCard key={i} recipeIndex={i} recipe={recipe} />
               ))}
            </CascadingGrid>
         </Suspense>
      </RecipeListWrapper>
   );
};

export default RecipeList;
