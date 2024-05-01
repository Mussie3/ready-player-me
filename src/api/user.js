
export default async function handler(req, res) {
  const response = await fetch('https://adlerinternal-4ba15m.readyplayer.me/api/v1/user', {
    method: req.method,
    headers: req.headers,
  });
  console.log(response);
  const data = await response.json();

  res.status(response.status).json(data);
}