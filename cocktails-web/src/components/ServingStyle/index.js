import PopoverSelection from '../PopoverSelection';

const ServingStyle = (props) => {
   const alternatives = [
      { value: 'highball' },
      { value: 'cocktail' },
      { value: 'coupe' },
      { value: 'rocks' },
      { value: 'flute' },
   ];

   return (
      <PopoverSelection
         alternatives={alternatives}
         value={props.value}
         onChange={props.onChange}
      />
   );
};

export default ServingStyle;
