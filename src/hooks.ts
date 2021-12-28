import client from '$lib/client';
import type { GetSession, Handle } from '@sveltejs/kit/types/hooks';
import * as cookie from 'cookie';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie ?? '');
	const token = cookies.token;
	request.locals.user = token
		? await client.user.findFirst({
				where: {
					accessToken: token
				},
				select: {
					id: true,
					username: true,
					avatar: true
				}
		  })
		: null;

	return await resolve(request);
};

export const getSession: GetSession = ({ locals }) => {
	return {
		user: locals.user
	};
};
