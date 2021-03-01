import RecipeContextProvider from './contextProviders/recipeContext';
import Cocktails from './components/Cocktails';
import ModalContextProvider from './contextProviders/modalContext';
import UserContextProvider from './contextProviders/userContext';
import ToastContextProvider from './contextProviders/toastContext';

const App = () => {
   return (
      <ToastContextProvider>
         <UserContextProvider>
            <RecipeContextProvider>
               <ModalContextProvider>
                  <Cocktails />
               </ModalContextProvider>
            </RecipeContextProvider>
         </UserContextProvider>
      </ToastContextProvider>
   );
};

export default App;
