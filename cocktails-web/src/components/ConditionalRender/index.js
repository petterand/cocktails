const ConditionalRender = (props) => {
   if (props.predicate) {
      return props.children;
   } else {
      return props.fallback || null;
   }
};

export default ConditionalRender;
