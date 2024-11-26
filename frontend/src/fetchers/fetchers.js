const link = "http://localhost:8090";

export async function getUserByUsername(username) {
  let user = null;
  await fetch(link + `/users/username/${username}`)
    .then((res) => res.json())
    .then((res) => (user = res))
    .catch((err) => console.log(err));

  return user;
}
export async function getUserById(uid) {
  let user = null;
  await fetch(link + `/users/${uid}`)
    .then((res) => res.json())
    .then((res) => (user = res))
    .catch((err) => console.log(err));

  return user;
}

export async function getChatsOfUser(uid) {
  const jwt = sessionStorage.getItem("jwt");
  let chats = [];
  console.log(jwt);

  await fetch(`${link}/api/chat/user/${uid}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (chats = res))
    .catch((err) => console.log(err));
  return chats;
}

export async function getChatOfUsers(id1, id2) {
  const jwt = sessionStorage.getItem("jwt");

  if (!jwt) {
    console.error("JWT not found");
    return null;
  }
  try {
    const response = await fetch(`${link}/api/chat/user/${id1}/${id2}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const chat = await response.json();
    return chat;
  } catch (error) {
    console.error("Error fetching chat:", error);
    return null;
  }
}

export async function getCurrentUser() {
  const jwt = sessionStorage.getItem("jwt");
  try {
    const response = await fetch(`${link}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch the current user:", error);
    return null;
  }
}
