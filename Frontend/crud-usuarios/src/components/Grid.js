import React from "react";
import styled from "styled-components";
import axios from "axios";
import { FaTrash, FaEdit,FaPlusCircle  } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead`
`;

export const Tbody = styled.tbody`

`;

export const Tr = styled.tr``;

export const Th = styled.th`
 text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: nomee"}
  }
`;

export const Td = styled.td`
 padding-top: 15px;
 text-align: ${(props) => props.alignCenter ? 'center' : "start"};
 width:  ${(props) => props.width ? props.width : 'auto'};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: nomee"}
  }
`;



const Grid = ({ users,setUsers,setOnEdit,setAdditionalDetails  }) => {
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const handleDelete = async (id) => {
    await axios.delete("http://localhost:8800/" + id)
    .then(({data})=> {
      const newArray = users.filter((user) => user.idusuarios !== id);
  
      setUsers(newArray)
      toast.success(data)
    })
    .catch(({data}) => toast.error(data))
  }

  const handleEdit = async (item) => {
    setOnEdit(item);
  }

  const handleAdicionalDetails = async (id) => {

    await axios.get("http://localhost:8800/user/" + id)
    .then(({data})=> {
      console.log(data)
      setAdditionalDetails(data);
      ;
  
      // setUsers(newArray)
      // toast.success(data)
    })
    .catch(({data}) => toast.error(data))

    // Faça a requisição aqui
    // const response = await fetch('/api/dados');
    // const data = await response.json();
    
    // // Atualize o estado adicionalDetails no componente pai
    // setAdditionalDetails(item);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th onlyWeb>Telefone</Th>
          <Th>Data nascimento</Th>
          <Th></Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users?.map((item,i) => (
            <Tr key={i}>
                <Td width={"20%"}>{item?.nome}</Td>
                <Td width={"30%"}>{item?.email}</Td>
                <Td width={"20%"} onlyWeb>{item?.telefone}</Td>
                <Td width={"20%"}>{formatDate(item?.data_nascimento)}</Td>
                <Td alignCenter width="3%">
                    <FaEdit onClick={()=>handleEdit(item)}/>
                </Td>
                <Td alignCenter width="5%">
                    <FaTrash onClick={()=>handleDelete(item.idusuarios)}/>
                </Td>
                <Td alignCenter width="5%">
                    <FaPlusCircle onClick={()=>handleAdicionalDetails(item.idusuarios)}/>
                </Td>
            </Tr>
        ))

        }
      </Tbody>
    </Table>
  );
};

export default Grid;
