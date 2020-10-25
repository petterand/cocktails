import React, { useState } from 'react';
import styled from 'styled-components';
import getCaretCoordinates from './getCaretCoordinates';

const getLastWord = (string) => string.split(' ').reverse()[0];

const AutoCompleteTextBox = (props) => {
   const [showList, setShowList] = useState(false);
   const [caretPos, setCaretPos] = useState(null);

   const onKeyDown = (e) => {
      if (e.keyCode === 9) {
         e.preventDefault();
         setShowList(true);
         const pos = getCaretCoordinates(e.target, e.target.selectionStart);

         setCaretPos({ top: pos.top + pos.height, left: pos.left });
      }
   };
   return (
      <AutoCompleteWrapper>
         <TextBox onKeyDown={onKeyDown} />
         {showList && (
            <Suggestions suggestions={props.suggestions} position={caretPos} />
         )}
      </AutoCompleteWrapper>
   );
};

const Suggestions = (props) => {
   return <SuggestionsList {...props} />;
};

const TextBox = styled.textarea`
   border: 1px solid #cecece;
   outline: none;
   flex: 1;
   font-family: 'Ubuntu', sans-serif;
   font-size: 16px;
   width: 100%;
   height: 6em;
   resize: none;
   line-height: 1.2;
`;

const SuggestionsList = styled.div`
   position: absolute;
   top: ${(props) => props.position.top}px;
   left: ${(props) => props.position.left}px;
   width: 150px;
   height: 100px;
   border: 1px solid #000;
   background: white;
`;

const AutoCompleteWrapper = styled.div`
   position: relative;
`;

export default AutoCompleteTextBox;
export { getLastWord };
