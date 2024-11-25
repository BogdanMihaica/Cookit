const link = "http://localhost:8090";
export async function getUserByUsername(username) {
  let user = null;
  await fetch(link + `/users/username/${username}`)
    .then((res) => res.json())
    .then((res) => (user = res))
    .catch((err) => console.log(err));

  return user;
}
