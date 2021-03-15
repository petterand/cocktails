export const sendEvent = (action, object) => {
   if (window.gtag) {
      window.gtag('event', action, object);
   }
};
