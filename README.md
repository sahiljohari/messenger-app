# messenger-app

A simple messenger app built using [socket-io](https://socket.io/) library.

#### Tech-stack:

- React.js [Client]
- Node.js [Server]
- Typescript [Server]

![messenger](demo.png)

#### To run the application:

- Client: `yarn run start`
- Server: `yarn run start:server`
- Run client and server together: `yarn run start:all`

#### Progress so far:

- [x] Add an Info bar at the top of chat container
- [x] Style the input text field
- [x] Implement scroll-to-bottom feature
- [ ] Implement "typing..." feature
- [ ] Introduce Toast notifications
- [ ] Pass credentials as props instead of query string parameters
- [ ] Redesign Login and LogOut component
- [x] Create a wrapper around server code
- [x] Replace `npm` with `yarn`
- [x] Error handling in Server
- [ ] Convert client to TypeScript
- [ ] Implement Online indicator feature
- [ ] Invite friends feature
- [ ] Emojis feature
- [ ] Deploy v1 app on a cloud platform

#### Want to contribute?

- Clone the repo using the command: `git clone https://github.com/sahiljohari/messenger-app.git`
- Run `yarn` when necessary
- Create pull requests against `develop` branch
- Add appropriate description, steps for review, and labels to your pull request

**Note**: Any pull request made against `master` branch will be rejected automatically.

#### Inspiration

[Realtime Chat Application by Adrian Hajdin](https://github.com/adrianhajdin/project_chat_application)
