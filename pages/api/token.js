export default function handler(req, res) {
	console.log('sending token', process.env.GITLAB_ACCESS_TOKEN)
	res.status(200).json({token: process.env.GITLAB_ACCESS_TOKEN});
}
