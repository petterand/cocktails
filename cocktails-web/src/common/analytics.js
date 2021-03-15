export const sendEvent = (category, object) => {
   if (window.gtag) {
      window.gtag('event', category, object);
   }
};
