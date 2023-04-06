export function renderLoginComponent({appEl, setToken, fetchRenderComments }) {
  const appHtml = `    
    <div class="container">
    <div class="add-form" id="input-box">
      <input
        id="login-input"
        type="text"
        class="add-form-name"
        placeholder="Введите логин"
      />
      <input
      id="password-input"
      type="text"
      class="add-form-name"
      placeholder="Введите пароль"
    />
      <div class="add-form-row">
        <button id="login-button" class="add-form-button">Войти</button>
      </div>
    </div>
    </div>
    `;

  appEl.innerHTML = appHtml;

  document.getElementById("login-button").addEventListener("click", () => {

    setToken("Bearer cgascsbkas6g5g5g5g5g6gcgascsbkas");

    fetchRenderComments();
  });
}
