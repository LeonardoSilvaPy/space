import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyD8nX_cGZHHXB07IicXoNw2U2gbD_00cHY",
  authDomain: "new-space-project.firebaseapp.com",
  projectId: "new-space-project",
  storageBucket: "new-space-project.firebasestorage.app",
  messagingSenderId: "455628678631",
  appId: "1:455628678631:web:0725827e5f19ea48f04942"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


function emailInput() {
  return document.getElementById("email")?.value;
}

function passwordInput() {
  return document.getElementById("password")?.value;
}


window.register = function () {

  const email = emailInput();
  const password = passwordInput();

  const msg = document.getElementById("msg");

  if (!email || !password) {
    msg.innerText = "Preencha todos os campos";
    msg.className = "error";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {

      msg.innerText = "Cadastro realizado!";
      msg.className = "success";

      setTimeout(() => {
        location.href = "index.html";
      }, 1200);

    })
    .catch(err => {

      msg.innerText = err.message;
      msg.className = "error";

    });
};


window.login = function () {

  const email = emailInput();
  const password = passwordInput();

  const msg = document.getElementById("msg");

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      location.href = "index.html";
    })
    .catch(() => {

      msg.innerText = "Email ou senha inválidos";
      msg.className = "error";

    });
};


window.logout = function () {

  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(err => {
      alert("Erro ao sair: " + err.message);
    });

};


onAuthStateChanged(auth, user => {

  const guest = document.getElementById("guest");
  const userBox = document.getElementById("user");
  const welcome = document.getElementById("welcome");

  if (user) {

    if (guest) guest.style.display = "none";
    if (userBox) userBox.style.display = "block";

    if (welcome) {
      welcome.innerText = "Bem-vindo, " + user.email;
    }

  } else {

    if (guest) guest.style.display = "block";
    if (userBox) userBox.style.display = "none";

  }

});
