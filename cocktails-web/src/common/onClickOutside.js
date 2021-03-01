export default function onClickOutside(elem, callback) {
   const listener = (e) => {
      if (!elem.contains(e.target)) {
         callback();
         removeListener();
      }
   };
   const removeListener = () => document.removeEventListener('click', listener);

   document.addEventListener('click', listener);

   return removeListener;
}
