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

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  collection
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


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
const db = getFirestore(app);


function get(id) {
  return document.getElementById(id)?.value;
}

window.register = async function () {

  const nickname = get("nickname");
  const email = get("email");
  const password = get("password");
  const msg = document.getElementById("msg");

  if (!nickname || !email || !password) {
    msg.innerText = "Preencha todos os campos";
    msg.className = "error";
    return;
  }

  try {

    const q = query(
      collection(db, "users"),
      where("nickname", "==", nickname)
    );

    const snap = await getDocs(q);

    if (!snap.empty) {
      msg.innerText = "Usuário já existe";
      msg.className = "error";
      return;
    }

    const cred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", cred.user.uid), {
      uid: cred.user.uid,
      email,
      nickname,
      createdAt: Date.now()
    });

    msg.innerText = "Cadastro realizado!";
    msg.className = "success";

    setTimeout(() => {
      location.href = "index.html";
    }, 1200);

  } catch (err) {

    msg.innerText = err.message;
    msg.className = "error";
  }
};


window.login = async function () {

  const login = get("login");
  const password = get("password");

  const msg = document.getElementById("msg");

  if (!login || !password) {
    msg.innerText = "Preencha tudo";
    msg.className = "error";
    return;
  }

  try {

    let email = login;

    if (!login.includes("@")) {

      const q = query(
        collection(db, "users"),
        where("nickname", "==", login)
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        msg.innerText = "Usuário não encontrado";
        msg.className = "error";
        return;
      }

      email = snap.docs[0].data().email;
    }

    await signInWithEmailAndPassword(auth, email, password);

    location.href = "index.html";

  } catch {

    msg.innerText = "Login inválido";
    msg.className = "error";
  }
};

window.logout = async function () {

  await signOut(auth);
  location.href = "index.html";
};

onAuthStateChanged(auth, async user => {

  const guest = document.getElementById("guest");
  const userBox = document.getElementById("user");
  const welcome = document.getElementById("welcome");

  if (!guest || !userBox) return;

  if (user) {

    const snap = await getDoc(doc(db, "users", user.uid));

    let name = user.email;

    if (snap.exists()) {
      name = snap.data().nickname;
    }

    guest.style.display = "none";
    userBox.style.display = "block";

    welcome.innerText = "Bem-vindo, " + name;

  } else {

    guest.style.display = "block";
    userBox.style.display = "none";
  }
});
