import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useModalContext } from '../../contextProviders/modalContext';
import { Button, Input } from '../../common/styles';
import { getAndSetKey } from '../../common/auth';
import { useUserContext } from '../../contextProviders/userContext';

const Wrapper = styled.div`
   padding: 0 16px;
   h3 {
      margin-bottom: 16px;
   }
   form {
      display: flex;
      flex-direction: column;
   }
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

const SignInModalBody = () => {
   const { closeModal } = useModalContext();
   const { signIn } = useUserContext();
   const [error, setError] = useState(null);
   const userRef = useRef(null);
   const passwordRef = useRef(null);

   useEffect(() => {
      userRef.current.focus();
   }, []);

   const onInputChange = () => setError(null);

   const onClick = async (e) => {
      e.preventDefault();

      try {
         setError(null);
         const username = userRef.current.value;
         const password = passwordRef.current.value;

         if (username && password) {
            await signIn(`${username}:${password}`);
            closeModal();
         } else {
            setError('Du måste ange både användarnamn och lösenord');
         }
      } catch (e) {
         console.error(e);
         setError('Inloggning misslyckades');
      }
   };

   useEffect(() => {
      if (error) {
         console.error(error);
      }
   }, [error]);

   return (
      <Wrapper>
         <h3>Logga in</h3>
         <form onSubmit={onClick}>
            <Input
               type="text"
               autoComplete="username"
               placeholder="Användarnamn"
               ref={userRef}
               onChange={onInputChange}
            />
            <Input
               type="password"
               autoComplete="current-password"
               placeholder="Lösenord"
               ref={passwordRef}
               onChange={onInputChange}
            />
            <div>
               <Button type="submit">Logga in</Button>
            </div>
         </form>
      </Wrapper>
   );
};

export default SignInModalBody;
