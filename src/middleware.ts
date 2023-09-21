import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const protectedRoutes = ['/home', '/create-new'];

export function middleware(request: NextRequest) {
	const currentUser = request.cookies.get('currentUser')?.value;

	if (
		protectedRoutes.some(path => request.nextUrl.pathname.includes(path)) &&
		!currentUser
	) {
		request.cookies.delete('currentUser');
		const response = NextResponse.redirect(
			new URL('/', request.url)
		);
		response.cookies.delete('currentUser'); 

		return response;
	}

}
