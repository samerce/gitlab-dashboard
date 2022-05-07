import { getGitLabRedirectUrl } from "../../../util/api"

let oauth;

export default function handler(req, res) {
  const { code, state } = req.query
  fetch('https://gitlab.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITLAB_CLIENT_ID,
        client_secret: process.env.GITLAB_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: getGitLabRedirectUrl(),
        code,
        state,
        }),
    })
    .then(response => response.json())
    .then(json => {
      oauth = json
      res.redirect(`/?accessToken=${json.access_token}`)
      console.log(json)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}
