export const getUser = async () => {
  const jwt = sessionStorage.getItem("jwt");
  const payload = JSON.parse(atob(jwt.split(".")[1]));
  const username = payload.sub;
  const url = `http://localhost:8090/users/username/${username}`;
  let userData = {};
  await fetch(url)
    .then((data) => data.json())
    .then((res) => (userData = res))
    .catch((err) => console.log(err));
  return userData;
};
