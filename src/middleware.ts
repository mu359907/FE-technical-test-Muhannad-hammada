// Authentication middleware removed - direct access to all routes
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
    // Redirect root path to Exam-Management
    if (req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/Exam-Management', req.url));
    }
    
    // Allow all other requests to pass through
    return NextResponse.next();
}

export const config = { matcher: ["/", "/Exam-Management"] };

