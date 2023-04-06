import { loginUser } from "./api.js";

export function renderLoginComponent({ appEl, setToken, fetchRenderComments }) {
  let isLoginMode = false;

  const renderForm = () => {
    const appHtml = `    
    <div class="container">
    <div class="add-form" id="input-box">
    ${
      isLoginMode
        ? ""
        : `<input
    id="name-input"
    type="text"
    class="add-form-name"
    placeholder="Введите имя"
    />`
    }
    
    <input
    id="login-input"
    type="text"
    class="add-form-name"
    placeholder="Введите логин"
    />
    <input
    id="password-input"
    type="password"
    class="add-form-name"
    placeholder="Введите пароль"
    />
  <div class="add-form-row">
    <button id="login-button" class="add-form-button">${
      isLoginMode ? "Войти" : "Регистрация"
    }</button>
    <button id="toggle-button" class="add-form-button">${
      isLoginMode ? "Перейти к регистрации" : "Перейти ко входу"
    }</button>
  </div>
</div>
</div>
`;

    appEl.innerHTML = appHtml;

    document.getElementById("login-button").addEventListener("click", () => {
      const login = document.getElementById("login-input").value;
      const password = document.getElementById("password-input").value;

      if (!login) {
        alert("Введите логин");
        return;
      }

      if (!password) {
        alert("Введите пароль");
        return;
      }

      loginUser({
        login: login,
        password: password,
      })
        .then((user) => {
          setToken(`Bearer ${user.user.token}`);
          fetchRenderComments();
        })
        .catch((error) => {
          alert(error.message);
        });
    });

    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  };

  renderForm();
}
