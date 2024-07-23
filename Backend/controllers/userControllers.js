import { db } from "../db.js";

export const getUser = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios (nome,telefone,data_nascimento,email) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.telefone,
    req.body.data_nascimento,
    req.body.email,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.status(404).json(err);

    return res.status(200).json("Usuário criado com sucesso");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios set nome = ? ,telefone = ?, data_nascimento = ?, email = ? WHERE idusuarios = ?";

  const values = [
    req.body.nome,
    req.body.telefone,
    req.body.data_nascimento,
    req.body.email,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.status(404).json(err);

    return res.status(200).json("Usuário atualizado com sucesso");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios  WHERE idusuarios = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json("Usuário deletado com sucesso");
  });
};

export const getUserDetails = (req, res) => {
  const q = `
      SELECT 
        u.nome,
        e.rua,
        e.numero,
        e.cidade,
        p.nome AS pais
      FROM 
        enderecos AS e
      INNER JOIN 
        usuarios AS u ON e.idusuario = u.idusuarios
      INNER JOIN 
        paises AS p ON e.idpais = p.idpais
      WHERE 
        u.idusuarios = ?
    `;

  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.status(404).json(err);

    if (result.length > 0) {
      return res.status(200).json(result[0]); // Retorna apenas o primeiro objeto
    } else {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  });
};

export const addAddress = (req, res) => {
  const q =
    "INSERT INTO enderecos (rua, numero, cidade, idpais, idusuario) VALUES (?)";

  const values = [
    req.body.rua,
    req.body.numero,
    req.body.cidade,
    req.body.idpais,
    req.body.idusuario,
  ];

  console.log(values);
  db.query(q, [values], (err) => {
    if (err) return res.status(404).json(err);

    return res.status(200).json("Endereço criado com sucesso");
  });
};

export const updateAddress = (req, res) => {
  const q =
    "UPDATE enderecos set rua = ?, numero = ?, cidade = ? WHERE idusuario = ?";

  const values = [req.body.rua, req.body.numero, req.body.cidade];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.status(404).json(err);

    return res.status(200).json("Endereço atualizado com sucesso");
  });
};

export const addCountry = (req, res) => {
  const q = "INSERT INTO paises (nome) VALUES (?)";

  const values = [req.body.nome];

  console.log(values);
  db.query(q, [values], (err) => {
    if (err) return res.status(404).json(err);

    return res.status(200).json("País criado com sucesso");
  });
};
