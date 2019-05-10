import {encodeFormParams} from './utils.js';

const loggedUserSymbol = Symbol('logged-user');
const loginObservers = [];

const limpaCampos = (fields) => () => fields.forEach(el => el.value = '');

const login = {
  [loggedUserSymbol]: null,

  get loggedUser() {
    return this[loggedUserSymbol];
  },

  set loggedUser(newValue) {
    const oldValue = this[loggedUserSymbol];
    this[loggedUserSymbol] = newValue;
    loginObservers.forEach(fn => fn(oldValue, newValue));
  }
};

login.recuperarLoginAntigo = function() {
  const userSalvo = localStorage.getItem('user');
  if (!!userSalvo) {
    this.loggedUser = JSON.parse(userSalvo);
  }
};

login.observe = (fn) => loginObservers.push(fn);

login.unobserve = (fn) => loginObservers.splice(loginObservers.indexOf(fn), 1);

login.config = function({ formEl, logoutEl, nomeUsuarioEl, deslogadoEl, logadoEl }) {
  const modalEl = formEl.closest('.modal');
  // pega todos os inputs que têm um name
  const fields =  Array.from(formEl.querySelectorAll('input[name]'));

  // inicializa o modal
  M.Modal.init(modalEl, {
    onOpenStart: limpaCampos(fields)
  });

  // registra o evento de submissão do formulário de login
  formEl.addEventListener('submit', e => {
    // previne o envio do formulário, que é a ação padrão do evento
    e.preventDefault();

    fetch(formEl.action, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: encodeFormParams(fields)
    }).then(response => response.json())
    .then(response => {
      if (response && response.success) {
        // fecha o modal
        const modal = M.Modal.getInstance(formEl.closest('.modal'));
        modal.close();

        // limpa os campos
        fields.forEach(el => el.value = '');

        // define o novo usuário
        login.loggedUser = response.data.user;
      } else {
        M.toast({html: 'Usuário ou senha incorretos.'});
        fields[0].focus();
      }
    })
    .catch(err => {
      // exibe mensagem de erro
      M.toast({html: `Erro ao tentar logar. Detalhes: ${err}`});
    });
  });


  // registra o evento de logout
  logoutEl.addEventListener('click', e => {
    login.loggedUser = null;
  });


  // registra um observador para sempre que o loggedUser for alterado
  login.observe((oldUser, newUser) => {
    // salva em cache o novo usuário
    localStorage.setItem('user', JSON.stringify(newUser));

    // alterna a visão de logar/deslogar
    if (!!newUser) {
      // novo usuário válido: acabou de logar
      deslogadoEl.setAttribute('hidden', '');
      logadoEl.removeAttribute('hidden');
      nomeUsuarioEl.innerHTML = newUser.name;

      M.toast({html: `Entrou como ${newUser.name}`});
    } else {
      // novo usuário null: deslogou
      deslogadoEl.removeAttribute('hidden');
      logadoEl.setAttribute('hidden', '');
      nomeUsuarioEl.innerHTML = '';

      if (!!oldUser) {
        M.toast({html: `Saiu do login de ${oldUser.name}`});
      }
    }
  });

  // verifica se já não está logado (olhando para localStorage)
  this.recuperarLoginAntigo();
};


export default login;
