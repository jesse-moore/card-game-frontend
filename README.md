# blackjack-frontend

### View app -> [Live](https://blackjack.jesse-moore.com)

### Backend Repository -> [Backend](https://github.com/jesse-moore/card-game-api)

### About

This is a single page application to play a blackjack card game. This app is used to display the game and interact with the game api where all the game logic is performed. It was created for a Mintbean Hackathon.

### Technologies

#### App

[![Typescript][typescript-badge]][typescript-url]
[![NextJS][nextjs-badge]][nextjs-url]
[![Tailwind Badge][tailwind-badge]][tailwind-url]
[![GraphQL][graphql-badge]][graphql-url]
[![AWS][aws-badge]][aws-url]

#### Deployment

Hosted on EC2 instance

### Screenshots

#### Game play

![screenshot](/src/images/blackjack_screen.png)

#### Change bet after round

![screenshot](/src/images/blackjack_screen3.png)
![screenshot](/src/images/blackjack_screen4.png)

#### Deck reshuffled alert

![screenshot](/src/images/blackjack_screen2.png)

#### Cash restored after player goes bankrupt

![screenshot](/src/images/blackjack_screen5.png)

### Deploy

#### Install node_modules

```
npm i
```

#### Setup .env files

```
API URL
NEXT_PUBLIC_API=

AWS Cognito config
NEXT_PUBLIC_COGNITO_POOL_ID=
NEXT_PUBLIC_COGNITO_CLIENT_ID=
```

#### Start Application

start dev server `npm run dev`

generate graphql types `npm run codegen`

Build production application `npm run build`

Export as static site `npm run export`

Deploy to your favorite static site host

#### Created by

Jesse Moore
| [LinkedIn](https://www.linkedin.com/in/jesse-moore-00804030/)
| [Github](https://github.com/jesse-moore)

[typescript-url]: https://www.typescriptlang.org
[typescript-badge]: https://img.shields.io/badge/TypeScript-222222?style=flat-square&logo=typescript
[graphql-url]: https://graphql.org/
[graphql-badge]: https://img.shields.io/badge/GraphQL-222222?style=flat-square&logo=graphql
[tailwind-url]: https://tailwindcss.com/
[tailwind-badge]: https://img.shields.io/badge/Tailwind%20CSS-222222?style=flat-square&logo=tailwindcss
[nextjs-url]: https://nextjs.org/
[nextjs-badge]: https://img.shields.io/badge/NextJS-black?style=flat-square&logo=next.js
[aws-url]: https://aws.amazon.com/
[aws-badge]: https://img.shields.io/badge/Amazon%20AWS-black?style=flat-square&logo=amazonaws
