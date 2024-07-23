import GlobalStyle from "./styles/globalStyles/globals.js";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import Form from "./components/Form.js";

import "react-toastify/dist/ReactToastify.css"; // Importa o CSS do react-toastify
import Grid from "./components/Grid.js";
import { useState, useEffect } from "react";
import axios from "axios";
import ContainerAdicionalDetails from "./components/AdicionalDetails.js";

const Container = styled.div`
  width: 100vw;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 0px #ccc;
  border-radius: 5px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res?.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);
  return (
    <>
      <Container>
        <Title> Crud Usuários </Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} setAdditionalDetails={setAdditionalDetails} />
      </Container>
      <Container>
        <Title> Informações adicionais </Title>
        <ContainerAdicionalDetails details={additionalDetails}/>
      </Container>
      <ToastContainer
        autoClose={3000}
        // position={toast.position.bottom_left}
        position="top-center"
      />
      <GlobalStyle />
    </>
  );
}

export default App;
