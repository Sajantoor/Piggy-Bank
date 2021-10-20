export const __PROD__ = process.env.NODE_ENV === 'production';
export const apolloServerUri = !__PROD__ ? "http://localhost:4000/graphql" : "placeholder";