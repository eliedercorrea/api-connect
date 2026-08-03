const users = require('../data/users');

const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const proximoId = () => {
  if (users.length === 0) return 1;
  return Math.max(...users.map((user) => user.id)) + 1;
};

const listUsers = (req, res) => {
  return res.status(200).json({
    sucesso: true,
    total: users.length,
    dados: users
  });
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'O ID informado é inválido.'
    });
  }

  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      sucesso: false,
      mensagem: 'Usuário não encontrado.'
    });
  }

  return res.status(200).json({
    sucesso: true,
    dados: user
  });
};

const createUser = (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Os campos nome e email são obrigatórios.'
    });
  }

  if (typeof nome !== 'string' || nome.trim().length < 2) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'O nome deve possuir pelo menos 2 caracteres.'
    });
  }

  if (typeof email !== 'string' || !emailValido(email.trim())) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Informe um email válido.'
    });
  }

  const emailNormalizado = email.trim().toLowerCase();
  const emailJaExiste = users.some((user) => user.email.toLowerCase() === emailNormalizado);

  if (emailJaExiste) {
    return res.status(409).json({
      sucesso: false,
      mensagem: 'Já existe um usuário cadastrado com esse email.'
    });
  }

  const novoUsuario = {
    id: proximoId(),
    nome: nome.trim(),
    email: emailNormalizado
  };

  users.push(novoUsuario);

  return res.status(201).json({
    sucesso: true,
    mensagem: 'Usuário cadastrado com sucesso.',
    dados: novoUsuario
  });
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { nome, email } = req.body;
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      sucesso: false,
      mensagem: 'Usuário não encontrado.'
    });
  }

  if (nome === undefined && email === undefined) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Informe ao menos um campo para atualização.'
    });
  }

  if (nome !== undefined) {
    if (typeof nome !== 'string' || nome.trim().length < 2) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'O nome deve possuir pelo menos 2 caracteres.'
      });
    }
    user.nome = nome.trim();
  }

  if (email !== undefined) {
    if (typeof email !== 'string' || !emailValido(email.trim())) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Informe um email válido.'
      });
    }

    const emailNormalizado = email.trim().toLowerCase();
    const emailJaExiste = users.some(
      (item) => item.id !== id && item.email.toLowerCase() === emailNormalizado
    );

    if (emailJaExiste) {
      return res.status(409).json({
        sucesso: false,
        mensagem: 'Já existe um usuário cadastrado com esse email.'
      });
    }

    user.email = emailNormalizado;
  }

  return res.status(200).json({
    sucesso: true,
    mensagem: 'Usuário atualizado com sucesso.',
    dados: user
  });
};

const replaceUser = (req, res) => {
  const id = Number(req.params.id);
  const { nome, email } = req.body;
  const index = users.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      sucesso: false,
      mensagem: 'Usuário não encontrado.'
    });
  }

  if (!nome || !email) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Os campos nome e email são obrigatórios para atualização via PUT.'
    });
  }

  if (typeof nome !== 'string' || nome.trim().length < 2) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'O nome deve possuir pelo menos 2 caracteres.'
    });
  }

  if (typeof email !== 'string' || !emailValido(email.trim())) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Informe um email válido.'
    });
  }

  const emailNormalizado = email.trim().toLowerCase();
  const emailJaExiste = users.some(
    (item) => item.id !== id && item.email.toLowerCase() === emailNormalizado
  );

  if (emailJaExiste) {
    return res.status(409).json({
      sucesso: false,
      mensagem: 'Já existe um usuário cadastrado com esse email.'
    });
  }

  users[index] = {
    id,
    nome: nome.trim(),
    email: emailNormalizado
  };

  return res.status(200).json({
    sucesso: true,
    mensagem: 'Usuário atualizado com sucesso.',
    dados: users[index]
  });
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      sucesso: false,
      mensagem: 'Usuário não encontrado.'
    });
  }

  const [usuarioRemovido] = users.splice(index, 1);

  return res.status(200).json({
    sucesso: true,
    mensagem: 'Usuário removido com sucesso.',
    dados: usuarioRemovido
  });
};

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  replaceUser,
  deleteUser
};
