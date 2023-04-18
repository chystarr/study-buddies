# Fall 2022 CUNY Tech Prep Final Project: Study Buddies

Study Buddies is a full-stack web application for college students to find study partners in their classes.

## Stack

> Node.js v16 LTS is recommended

_Backend API_

- express.js (v4.18.2)
- sequelize.js (v6.25.2)
- PostgreSQL (v14 recommended)

_Frontend React client_

- Based on `create-react-app`
- Bootstrap (v5)
- React Router (v6)

## Development Setup

- PostgreSQL User/Role
  - name: `ctp_user`
  - password: `ctp_pass`
- PostgreSQL Database
  - name: `ctp_appdb_development`

### Running the app locally

For local development you will need two terminals open, one for the api-backend and another for the react-client.

Clone this app, then:

```bash
# api-backend terminal 1
cp .env.example .env
npm install
npm run dev
```

```bash
# react-client terminal 2
cd client
npm install
npm start
```

- api-backend will launch at: http://localhost:8080
- react-client will launch at: http://localhost:3000


## Project Structure

<pre>
.
├── README.md
├── <strong>api</strong>
│   ├── app.js
│   ├── <strong>config</strong>
│   │   └── config.json
│   ├── <strong>controllers</strong>
│   │   ├── index.js
│   │   └── microPosts.js
│   └── <strong>models</strong>
│       ├── MicroPost.js
│       └── index.js
├── <strong>client</strong>
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── <strong>public</strong>
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── <strong>src</strong>
│       ├── App.css
│       ├── App.js
│       ├── <strong>components</strong>
│       │   ├── ErrorAlert.js
│       │   ├── LoadingSpinner.js
│       │   └── MicroPostCard.js
│       ├── index.js
│       └── <strong>pages</strong>
│           ├── AboutUsPage.js
│           ├── PostFormPage.js
│           ├── PostsListPage.js
│           └── ShowPostPage.js
├── package-lock.json
└── package.json
</pre>
