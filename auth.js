function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function goLogin() {
  window.location.href = "login.html";
}

function goRegister() {
  window.location.href = "login.html";
}

function register() {
  const email = emailInput();
  const password = passwordInput();
  const msg = document.getElementById("msg");

  if (!email || !password) {
    msg.innerText = "Preencha tudo";
    return;
  }

  const users = getUsers();

  if (users.find(u => u.email === email)) {
    msg.innerText = "Usuário já existe";
    return;
  }

  users.push({ email, password });
  saveUsers(users);

  msg.innerText = "Cadastro realizado!";
}

function login() {
  const email = emailInput();
  const password = passwordInput();
  const msg = document.getElementById("msg");

  const users = getUsers();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    msg.innerText = "Login inválido";
    return;
  }

  localStorage.setItem("loggedUser", email);

  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("loggedUser");
  window.location.reload();
}

function checkAuth() {
  const user = localStorage.getItem("loggedUser");

  if (!user) return;

  document.getElementById("guest").style.display = "none";
  document.getElementById("user").style.display = "block";

  document.getElementById("welcome").innerText =
    "Bem-vindo, " + user;
}

function emailInput() {
  return document.getElementById("email")?.value;
}

function passwordInput() {
  return document.getElementById("password")?.value;
}

checkAuth();
