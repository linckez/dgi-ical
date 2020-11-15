# Note
A generic service description goes here 

**This project is maintained and owned by the [MOX Moulding Team](https://github.com/orgs/LEGO/teams/moulding).**

## Disclaimer
The purpose of this is service is too...

# What can I do?
 - Purchase something

# Build project
`npm start`

# Development
`node ci-env.js` to generate .env template
`npm run start:dev` to start a nodemon server

#### Environment Variables
- `PORT = 80 [any port number]` 

# Endpoints
### COMBI Boxcheck
* [Boxcheck](docs/boxcheck/post.md) : `POST /api/boxcheck`

### Changeover
* [Check Production Order](docs/changeover/check/get.md) : `GET /api/changeover/check/{productionOrder}`
