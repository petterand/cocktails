import styled from 'styled-components';
import { Divider } from '../../common/styles';
import Button from '../Button';
import Preperation from '../Preparation';
import ServingStyle from '../ServingStyle';

const ToolsWrapper = styled.div`
   border-top: 1px solid var(--timber-wolf);
   padding-top: 8px;
   display: flex;

   > button {
      margin-left: auto;
      align-self: center;
   }
`;

const Tools = (props) => {
   return (
      <ToolsWrapper>
         <Preperation
            onChange={props.onChangePreparation}
            value={props.selectedPreperation}
         />
         <Divider />
         <ServingStyle
            onChange={props.onChangeServingStyle}
            value={props.selectedServingStyle}
         />
         <Button onClick={props.saveRecipe} busy={props.buttonBusy}>
            Spara
         </Button>
      </ToolsWrapper>
   );
};

export default Tools;
