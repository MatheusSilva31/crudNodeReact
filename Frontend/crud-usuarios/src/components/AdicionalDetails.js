import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Distribui o espaço uniformemente entre os elementos */
  align-content: center;
  align-items: center; /* Alinha os elementos verticalmente ao centro */
  padding: 20px;
  background-color: #fff;
`;

const Heading = styled.h2`
  margin: 10px; /* Remove a margem padrão */
  font-weight: bold;
  text-decoration: underline;
`;

const Text = styled.h4`
  margin: 10px; /* Remove a margem padrão */
`;

const ContainerAdicionalDetails = ({ details }) => {
  return (
    <FormContainer>
      <h1>What is Lorem Ipsum?</h1>
      <h5>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </h5>
      {details ? (
        <>
          <Container>
            <Heading>Nome</Heading>
            <Text>{details ? details.nome : null}</Text>
          </Container>
          <Container>
            <Heading>Endereço</Heading>
            <Text>{details ? details.rua : null}</Text>
          </Container>
          <Container>
            <Heading>Nº</Heading>
            <Text>{details ? details.numero : null}</Text>
          </Container>
          <Container>
            <Heading>Cidade</Heading>
            <Text>{details ? details.cidade : null}</Text>
          </Container>
          <Container>
            <Heading>País</Heading>
            <Text>{details ? details.pais : null}</Text>
          </Container>
        </>
      ) : null}
    </FormContainer>
  );
};

export default ContainerAdicionalDetails;
