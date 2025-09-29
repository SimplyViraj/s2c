export const isBypassRoutes=
[
    "/api/polar/webhook",
    "/api/inngest(.*)",
    "/convex(.*)",
    "/api/auth(.*)",
];

export const isPublicRoutes=
[
    "/",
    "/auth(.*)",
]    

export const isProtectedRoutes=["/dashboard(.*)"]