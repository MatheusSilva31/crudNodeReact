import GlobalStyle from "./styles/globalStyles/globals.js";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import Form from "./components/Form.js";

import 'react-toastify/dist/ReactToastify.css'; // Importa o CSS do react-toastify

const Container = styled.div`
  width: 100vw;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  return (
    <>
      <Container>
        <Title> Crud Usuários </Title>
        <Form />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
