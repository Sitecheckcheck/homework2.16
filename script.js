const nameInputElement = document.getElementById("name-input");
const listElement = document.getElementById("list");
const inputElement = document.getElementById("input-box");

let token = "Bearer cgascsbkas6g5g5g5g5g6gcgascsbkas";
token = null

let comments = [];

function fetchRenderComments() {
  return fetch(
    "https://webdev-hw-api.vercel.app/api/v2/pavel-danilov/comments",
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const options = {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        timezone: "UTC",
        hour: "numeric",
        minute: "2-digit",
      };

      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString("ru-RU", options),
          text: comment.text,
          likes: comment.likes,
          isLike: false,
          login: comment.author.login,
          commentId: comment.id,
          userId: comment.author.id,
        };
      });

      comments = appComments;
      renderComments();
    })
    .catch((error) => {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    });
}

const renderComments = () => {
  const appEl = document.getElementById("app");

  if (!token) {
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

    document.getElementById('login-button').addEventListener('click', ()=> {
      token = "Bearer cgascsbkas6g5g5g5g5g6gcgascsbkas";
      fetchRenderComments()
    })

    return
  }

  const commentHtml = comments
    .map((comment, index) => {
      return `<li class="comment" data-index = '${index}'>
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index ='${index}' class="like-button ${
        comment.isLike ? "-active-like" : ""
      }"></button>
        </div>
      </div>
      <div >
        <button data-id = ${
          comment.commentId
        } class="delete-button">удалить</button>
      </div>
    </li>`;
    })
    .join("");

  const appHtml = `    
            <div class="container">
            
            <ul id="list" class="comments">${commentHtml}</ul>
            <div class="add-form" id="input-box">
              <textarea
                id="text-input"
                type="textarea"
                class="add-form-text"
                placeholder="Введите ваш коментарий"
                rows="4"
              ></textarea>
              <div class="add-form-row">
                <button id="add-button" class="add-form-button">Написать</button>
              </div>
            </div>
          </div>`;

  appEl.innerHTML = appHtml;

  const buttonElement = document.getElementById("add-button");
  const textInputElement = document.getElementById("text-input");
  const deleteButtons = document.querySelectorAll(".delete-button");

  buttonElement.addEventListener("click", () => {
    fetch("https://webdev-hw-api.vercel.app/api/v2/pavel-danilov/comments", {
      method: "POST",
      body: JSON.stringify({ text: textInputElement.value }),
      headers: { Authorization: token },
    })
      .then((response) => {
        if (response.status === 201) {
          return;
        } else if (response.status === 400) {
          throw new Error("Имя и комментарий должны быть не короче 3 символов");
        } else if (response.status === 500) {
          throw new Error("Сервер упал");
        } else {
          throw new Error("Что то пошло не так");
        }
      })
      .then(() => {
        return fetchRenderComments();
      })
      .then(() => {
        textInputElement.value = "";
      })
      .catch((error) => {
        console.log(error);
        if (
          error.message ===
            "Имя и комментарий должны быть не короче 3 символов" ||
          error.message === "Что то пошло не так"
        ) {
          alert(error.message);
        } else if (error.message === "Сервер упал") {
          buttonElement.click();
        } else {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
      });
  });

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const id = deleteButton.dataset.id;
      fetch(
        "https://webdev-hw-api.vercel.app/api/v2/pavel-danilov/comments/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      ).then(() => {
        fetchRenderComments();
      });
    });
  }

  likeButton();
  inputClick();
};

// fetchRenderComments();
renderComments()
likeButton();

function likeButton() {
  const likeElements = document.querySelectorAll(".like-button");
  for (const i of likeElements) {
    i.addEventListener("click", (event) => {
      event.stopPropagation();
      i.classList.add("-loading-like");
      delay(500).then(() => {
        if (i.classList.contains("-active-like")) {
          comments[i.dataset.index].isLike = false;
          comments[i.dataset.index].likes -= 1;
        } else {
          comments[i.dataset.index].isLike = true;
          comments[i.dataset.index].likes++;
        }
        i.classList.remove("-loading-like");
        renderComments();
      });
    });
  }
}

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

function inputClick() {
  const inputInElement = document.querySelectorAll(".add-form-text");
  for (const i of inputInElement) {
    i.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}

// document.addEventListener("keyup", function (e) {
//   if (e.keyCode === 13) {
//     document.getElementById("add-button").click();
//   }
// });
