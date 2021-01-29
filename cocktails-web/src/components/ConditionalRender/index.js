const ConditionalRender = (props) => {
   if (props.predicate) {
      return props.children;
   } else {
      return null;
   }
};

export default ConditionalRender;
