## OPTIONS

```
// pages/api/auth/[...nextauth].js
interface OAuthConfig {
  /**
   * OpenID Connect (OIDC) compliant providers can configure
   * this instead of `authorize`/`token`/`userinfo` options
   * without further configuration needed in most cases.
   * You can still use the `authorize`/`token`/`userinfo`
   * options for advanced control.
   *
   * [Authorization Server Metadata](https://datatracker.ietf.org/doc/html/rfc8414#section-3)
   */
  wellKnown?: string
  /**
   * The login process will be initiated by sending the user to this URL.
   *
   * [Authorization endpoint](https://datatracker.ietf.org/doc/html/rfc6749#section-3.1)
   */
  authorization: EndpointHandler<AuthorizationParameters>
  /**
   * Endpoint that returns OAuth 2/OIDC tokens and information about them.
   * This includes `access_token`, `id_token`, `refresh_token`, etc.
   *
   * [Token endpoint](https://datatracker.ietf.org/doc/html/rfc6749#section-3.2)
   */
  token: EndpointHandler<
    UrlParams,
    {
      /**
       * Parameters extracted from the request to the `/api/auth/callback/:providerId` endpoint.
       * Contains params like `state`.
       */
      params: CallbackParamsType
      /**
       * When using this custom flow, make sure to do all the necessary security checks.
       * This object contains parameters you have to match against the request to make sure it is valid.
       */
      checks: OAuthChecks
    },
    { tokens: TokenSet }
  >
  /**
   * When using an OAuth 2 provider, the user information must be requested
   * through an additional request from the userinfo endpoint.
   *
   * [Userinfo endpoint](https://www.oauth.com/oauth2-servers/signing-in-with-google/verifying-the-user-info)
   */
  userinfo?: EndpointHandler<UrlParams, { tokens: TokenSet }, Profile>
  type: "oauth"
  /**
   * Used in URLs to refer to a certain provider.
   * @example /api/auth/callback/twitter // where the `id` is "twitter"
   */
  id: string
  version: string
  profile(profile: P, tokens: TokenSet): Awaitable<User>
  checks?: ChecksType | ChecksType[]
  clientId: string
  clientSecret: string
  /**
   * If set to `true`, the user information will be extracted
   * from the `id_token` claims, instead of
   * making a request to the `userinfo` endpoint.
   *
   * `id_token` is usually present in OpenID Connect (OIDC) compliant providers.
   *
   * [`id_token` explanation](https://www.oauth.com/oauth2-servers/openid-connect/id-tokens)
   */
  idToken?: boolean
  region?: string
  issuer?: string
  client?: Partial<ClientMetadata>
  allowDangerousEmailAccountLinking?: boolean
  /**
   * Object containing the settings for the styling of the providers sign-in buttons
   */
  style: ProviderStyleType
}
```

> [OAuth-nextAuth.jd](https://next-auth.js.org/configuration/providers/oauth)

## Sample

```ts

```
