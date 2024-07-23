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
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ onEdit,setOnEdit,getUsers }) => {
  const ref = useRef();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      console.log('user',user)

      user.nome.value = onEdit.nome;
      user.telefone.value = onEdit.telefone;
      user.data_nascimento.value = formatDate(onEdit.data_nascimento);
      user.email.value = onEdit.email;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    console.log('chamou')
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.telefone.value ||
      !user.data_nascimento.value ||
      !user.email.value
    ) {
      return toast.warn("Preencha todos os campos !");
    }

    if (onEdit) {
      console.log(onEdit)
      await axios
        .put("http://localhost:8800/" + onEdit.idusuarios, {
          nome: user.nome.value,
          telefone: user.telefone.value,
          data_nascimento: user.data_nascimento.value,
          email: user.email.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }else{
      console.log('chamou post')
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          telefone: user.telefone.value,
          data_nascimento: user.data_nascimento.value,
          email: user.email.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = ""
    user.telefone.value = ""
    user.data_nascimento.value = ""
    user.email.value = ""

    setOnEdit(null);
    getUsers();

  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" />
      </InputArea>
      <InputArea>
        <Label>Data de nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>

      <Button type="submit">Salvar </Button>
    </FormContainer>
  );
};

export default Form;
