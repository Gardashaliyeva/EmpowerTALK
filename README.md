
# EmpowerTALK Employee Communication Application

Employee Communication Application is a social-networking tool that leverages on technology advancement thereby allowing its users communicate and share media. It offers a wonderful one-stop-shop experience for staying connected with colleagues. It can be used for messaging, share updates and photos, upload files for sending and download files when receiving. 



## Environment setup for local deployment

You need to install NodeJS for npm package manager. Follow the https://nodejs.org/en/download for macOS Installer. If you have already got NodeJS, you are ready to go, but some points should be considered:

- Application uses GetStream Chat SDK for delivering communication functionalities. Go to https://getstream.io/ and create an account.


- Replace the "https://empower-talk.netlify.app/" in files with "http://localhost:5000" for local deployment.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file which you have to create on the server folder.

`STREAM_APP_ID`

`STREAM_API_KEY`

`STREAM_API_SECRET`

You can get the value of these variables on your getstream account.

## Deployment

To deploy this project, firstly clone the repository

```bash 
  git clone https://github.com/Gardashaliyeva/EmpowerTALK
```

Go to the project folder, then navigate to client folder

```bash
  cd EmpowerTALK/client/
  npm start
```

Open a new terminal, navigate to the server folder and run:

```bash
  cd server/
  npm run dev
```
## Now you can enjoy the project!

Test users' credentials:

User 1:

Username: Ali

Password: 12345678aA@

User 2:

Username: Aytaj

Password: Aytac@123
