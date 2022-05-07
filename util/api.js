export const getGitLabRedirectUrl = () => `http://localhost:${process.env.PORT}/api/oauth/redirect`

export const getGitLabAuthUrl = () => `https://gitlab.com/oauth/authorize?client_id=${process.env.GITLAB_CLIENT_ID}&redirect_uri=${escape(getGitLabRedirectUrl())}&response_type=code&state=${Math.random()}&scope=read_user+read_api+read_repository`