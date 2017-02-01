# Innogy SmartHome API Test Client

The Innogy SmartHome API Test Client is a simple webpage to interact with the Innogy SmartHome Client API. It contains dedicated sections for most of the possible API calls. The Client API represents a RESTful API for writing clients within the Innogy SmartHome ecosystem.

## Prerequisites

A basic understanding of the Innogy SmartHome Client API is necessary to fully utilize the webpage. Furthermore, valid client credentials (identifier and secret) are necessary to use the test client.

Local usage of the test client may be difficult. It is recommended that the test client is used for testing purposes only in conjunction with the redirect URL registered for the used client identifier.

## Usage

The API Test Client can be used in several ways.

1. With an authentication code
2. With a valid refresh token
3. As target from the redirect URL

In the next paragraphs we will investigate how each of these methods may be successfully used.

If we already have a (still) valid authentication code we may want to use the first method. As a prerequisite the URL of the test client (minus any query parameters) has to match the redirect URL. Furthermore, we can supply client id, secret and the authentication code.

The simplest way to use the test client is when we already obtained a refresh token. Here we can use method number two. We only need to supply our refresh token along the client id and secret and we are good to go. No other prerequisites have to be satisfied here.

The last method provides a simple way to obtain a refresh token (and authenticate in general). This one will perform the full OAuth flow to get into the test client. We need to provide the client id, secret, and redirect URL. In the best case the redirect URL is equivalent to the test client. In this case the test client will automatically perform the login by following method number 1.

For security reasons the refresh token is not displayed on the screen. It can, however, be obtained from the browser's debugging tools. One way is by inpecting the response from the authentication service, the other way is by looking at the closure object of the local JavaScript handlers (calling the actions).

## License

The code has been licensed under the MIT license. Details are given the [distributed license file](LICENSE).