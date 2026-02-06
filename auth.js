function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getEmail() {
  return document.getElementById("email")?.value.trim();
}

function getPassword() {
  return document.getElementById("password")?.value.trim();
}

function showMsg(text, type = "error") {
  const msg = document.getElementById("msg");
  if (!msg) return;

  msg.className = type;
  msg.innerText = text;
}

function goLogin() {
  location.href = "login.html";
}

function goRegister() {
  location.href = "login.html";
}

function register() {
  const email = getEmail();
  const password = getPassword();

  if (!email || !password) {
    showMsg("Preencha todos os campos");
    return;
  }

  const users = getUsers();

  if (users.some(u => u.email === email)) {
    showMsg("Usuário já existe");
    return;
  }

  users.push({ email, password });
  saveUsers(users);

  showMsg("Cadastro realizado com sucesso", "success");
}


function login() {
  const email = getEmail();
  const password = getPassword();

  const users = getUsers();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    showMsg("Email ou senha inválidos");
    return;
  }

  localStorage.setItem("loggedUser", email);

  showMsg("Login realizado", "success");

  setTimeout(() => {
    location.href = "index.html";
  }, 800);
}


function logout() {
  localStorage.removeItem("loggedUser");
  location.reload();
}

function checkAuth() {
  const user = localStorage.getItem("loggedUser");

  if (!user) return;

  const guest = document.getElementById("guest");
  const userBox = document.getElementById("user");
  const welcome = document.getElementById("welcome");

  if (!guest || !userBox || !welcome) return;

  guest.style.display = "none";
  userBox.style.display = "block";

  welcome.innerText = "Bem-vindo, " + user;
}

checkAuth();
