import { useEffect, useRef } from 'react';

/**
 * React hack for working with hooks and setInterval
 * @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param callback Function to run
 * @param delay Delay in milliseconds
 */
export const useInterval = (delay, callback) => {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	});

	useEffect(callback, []);

	useEffect(() => {
		function tick() {
			savedCallback.current?.();
		}

		const id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay]);
};
