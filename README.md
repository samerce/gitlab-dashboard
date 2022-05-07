# Gitlab Dashboard 
To run, first create `.env.local` file in root with:
```bash
PORT=3000 # or whatever you want
GITLAB_CLIENT_ID=app_token_from_gitlab
GITLAB_CLIENT_SECRET=app_secret_from_gitlab
```
Then:
```bash
yarn
yarn dev
```