import type { PageLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	let skip = Number(url.searchParams.get('skip')) || 0;
	let limit = Number(url.searchParams.get('limit')) || 10;
	const res = await fetch(`https://dummyjson.com/users?skip=${skip}&limit=${limit}`);
	return res.json();
}) satisfies PageLoad;
