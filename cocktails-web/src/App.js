import RecipeContextProvider from './contextProviders/recipeContext';
import Cocktails from './components/Cocktails';
import ModalContextProvider from './contextProviders/modalContext';
import UserContextProvider from './contextProviders/userContext';

const App = () => {
   return (
      <UserContextProvider>
         <ModalContextProvider>
            <RecipeContextProvider>
               <Cocktails />
            </RecipeContextProvider>
         </ModalContextProvider>
      </UserContextProvider>
   );
};

export default App;
