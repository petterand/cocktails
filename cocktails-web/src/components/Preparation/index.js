import PopoverSelection from '../PopoverSelection';

const Preperation = (props) => {
   const alternatives = [{ value: 'shake' }, { value: 'stir' }];

   return (
      <PopoverSelection
         alternatives={alternatives}
         value={props.value}
         onChange={props.onChange}
      />
   );
};

export default Preperation;
