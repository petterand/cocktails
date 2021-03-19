import { lazy, Suspense } from 'react';
import editIcon from '../../../images/edit_white.svg';
import shareIcon from '../../../images/share_white.svg';
import { sendEvent } from '../../common/analytics';
import { useModalContext } from '../../contextProviders/modalContext';
import { useToastContext } from '../../contextProviders/toastContext';
import { useUserContext } from '../../contextProviders/userContext';
import ConditionalRender from '../ConditionalRender';
import { BackMenuWrapper } from './styles';

const editModalPromise = import('../EditModal');
const EditModal = lazy(() => editModalPromise);

const BackMenu = (props) => {
   const { recipe } = props;
   const { isSignedIn } = useUserContext();
   const { openModal } = useModalContext();
   const { showToast } = useToastContext();

   const closeMenu = (e) => {
      e.stopPropagation();
      props.setIsMenuOpen(false);
   };

   const openEditModal = (e) => {
      e.stopPropagation();
      openModal({
         body: (
            <Suspense fallback={null}>
               <EditModal value={recipe} />
            </Suspense>
         ),
      });
   };

   const onShare = async (e) => {
      e.stopPropagation();
      sendEvent(`share`, { event_label: recipe.name });
      const url = `${window.location.origin}/${recipe.urlId}`;
      await navigator.clipboard.writeText(url);
      showToast({
         variant: 'info',
         timeout: 3000,
         text: 'Url kopierad till urklipp',
      });
   };

   return (
      <BackMenuWrapper onClick={closeMenu}>
         <ConditionalRender predicate={isSignedIn}>
            <div onClick={openEditModal}>
               <img src={editIcon} alt={`edit ${recipe.name}`} />
            </div>
         </ConditionalRender>
         <div onClick={onShare}>
            <img src={shareIcon} alt={`share ${recipe.name}`} />
         </div>
      </BackMenuWrapper>
   );
};

export default BackMenu;
