import { getGitLabAuthUrl } from "../../../util/api";

export default function handler(req, res) {
	console.log('returning auth url', getGitLabAuthUrl());
	res.redirect(getGitLabAuthUrl())
}