Full isomorphic app based on `create-react-app`, `universal-router`, `isomorphic-style-loader`, `redux`, `apollo-client`.

For start:

```
yarn build
yarn build:server
yarn start:server
```

Server started on http://0.0.0.0:5000/

If u want start to develop front-end:

```
yarn start
```

And on http://0.0.0.0:3000/ started usual create-react-app connected to backend.

For signup u need to configure `.env.server`:

REACT_APP_EMAIL_TRANSPORT=smtps://user@domain.com:password@smtp.gate.com
REACT_APP_EMAIL_FROM=user@domain.com

Or u created users:

root@root.com : toor
