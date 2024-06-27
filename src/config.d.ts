declare module '@/config' {
  const value: {
    oidc: {
      clientId: string;
      issuer: string;
      redirectUri: string;
      scopes: string[];
      pkce: boolean;
    };
  };
  export default value;
}