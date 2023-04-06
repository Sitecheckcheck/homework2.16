export function getComments({ token }) {
  return fetch(
    "https://webdev-hw-api.vercel.app/api/v2/pavel-danilov/comments",
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  ).then((response) => {
    return response.json();
  });
}

export function deleteComments({ token, id }) {
  return fetch(
    "https://webdev-hw-api.vercel.app/api/v2/pavel-danilov/comments/" + id,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );
}

export function addComments({ token, text }) {
  return fetch(
    "https://webdev-hw-api.vercel.app/api/v2/pavel-danilov/comments",
    {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { Authorization: token },
    }
  );
}
