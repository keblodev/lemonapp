# :rocket: Lemonred's contextual search pwa app

## What you see here is a:

- Preact-Redux Progressive Web App with Service worker caching and PRPL pattern consumed, powered with GraphQl through 3 Node servers all wtitten in lates ES6-ES7 code 
- Modular sandboxed apps architechture that can expand infinitely to any number of services and sub-apps
- Combined with size and performance analytics
- It's google-fast. First paint < 1sec. First interactive 1.3sec. Combined bundle size with all packages < 80kb (*all packages code-splitted with preload/prefetch)
- Microapps arch on top of MicroServices

## What it does:

- Current focus is on Feedrizer sub-app - a next-gen contextual personalized search app and engine

## Generate SSL on OSX
```
openssl req \
    -newkey rsa:2048 \
    -x509 \
    -nodes \
    -keyout key.pem \
    -new \
    -out cert.pem \
    -subj /CN=localhost \
    -reqexts SAN \
    -extensions SAN \
    -config <(cat /System/Library/OpenSSL/openssl.cnf \
        <(printf '[SAN]\nsubjectAltName=DNS:localhost')) \
    -sha256 \
    -days 3650
```

After that you'll need to manually add certificate to keychain.
reference this:
https://www.accuweaver.com/2014/09/19/make-chrome-accept-a-self-signed-certificate-on-osx/

## What else do you want?

- [ ] - Travis with lighthouse support

## Installation

**1. Clone this repo:**

```sh
git clone https://github.com/ronanamsterdam/lemonapp.git
cd lemonapp
```

**2. Install the dependencies:**

```sh
npm install
```

> You're done installing! Now let's get started developing.



## Development Workflow


**4. Start a live-reload development server:**

```sh
npm run dev
```

> This is a full web server nicely suited to your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.

**5. Testing with `mocha`, `karma`, `chai`, `sinon` via `phantomjs`:**

```sh
npm test
```

**6. Generate a production build in `./build`:**

```sh
npm run build
```

> You can now deploy the contents of the `build` directory to production!
>
> **[Surge.sh](https://surge.sh) Example:** `surge ./build -d my-app.surge.sh`


**5. Start local production server with `superstatic`:**

```sh
npm start
```

> This is to simulate a production (CDN) server with gzip. It just serves up the contents of `./build`.


---


## License

BSD-3-Clause


[Preact]: https://developit.github.io/preact
[webpack]: https://webpack.github.io
