import RecipeContextProvider from './contextProviders/recipeContext';
import Cocktails from './components/Cocktails';
import ModalContextProvider from './contextProviders/modalContext';

const App = () => {
   return (
      <ModalContextProvider>
         <RecipeContextProvider>
            <Cocktails />
         </RecipeContextProvider>
      </ModalContextProvider>
   );
};

export default App;
