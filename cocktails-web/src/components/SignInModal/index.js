import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useModalContext } from '../../contextProviders/modalContext';
import { Button, Input } from '../../common/styles';
import { getAndSetKey } from '../../common/auth';

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   input {
      margin-bottom: 8px;
      font-size: 0.8rem;
   }
   div {
      display: flex;
      button {
         margin-left: auto;
      }
   }
`;

const SignInModalBody = (props) => {
   const { closeModal } = useModalContext();
   const [error, setError] = useState(null);
   const userRef = useRef(null);
   const passwordRef = useRef(null);

   const onClick = () => {
      try {
         const username = userRef.current.value;
         const password = passwordRef.current.value;

         getAndSetKey(`${username}:${password}`);
         closeModal();
      } catch (e) {
         console.error(e);
      }
   };
   return (
      <Wrapper>
         <Input type="text" placeholder="Användarnamn" ref={userRef} />
         <Input type="password" placeholder="Lösenord" ref={passwordRef} />
         <div>
            <Button onClick={onClick}>Logga in</Button>
         </div>
      </Wrapper>
   );
};

export default SignInModalBody;
