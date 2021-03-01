import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useModalContext } from '../../contextProviders/modalContext';
import { Input } from '../../common/styles';
import { useUserContext } from '../../contextProviders/userContext';
import Button from '../Button';

const Wrapper = styled.div`
   padding: 0 16px;
   width: calc(90vw - 32px);
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
   @media screen and (min-width: 540px) {
      max-width: 300px;
   }
`;

const SignInModalBody = () => {
   const { closeModal } = useModalContext();
   const { signIn } = useUserContext();
   const [error, setError] = useState(null);
   const [busy, setBusy] = useState(false);
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
            setBusy(true);
            await signIn(`${username}:${password}`);
            setBusy(false);
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
               <Button type="submit" busy={busy}>
                  Logga in
               </Button>
            </div>
         </form>
      </Wrapper>
   );
};

export default SignInModalBody;
