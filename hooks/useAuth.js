import { useEffect } from "react"

const kNamespace = 'glDashboard.'
export const kGitLabTokenKey = kNamespace + 'glToken'

export default function useAuth() {
	useEffect(() => {
		let accessToken = localStorage.getItem(kGitLabTokenKey)
		if (!accessToken) {
			fetch('/api/token').then(r => r.json()).then(res => {
				localStorage.setItem(kGitLabTokenKey, res.token)
			})
		}
	}, [])
}
