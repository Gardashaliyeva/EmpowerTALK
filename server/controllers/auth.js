const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');
require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
    try {  
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username });

        if(!users.length) return res.status(400).json({ message: 'User not found' });

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if(success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};


const updatePassword = async (req, res) => {
    try {
        
      const { userId, oldPassword, newPassword } = req.body;
  
      // Implement logic to check if the old password is correct
      const serverClient = connect(api_key, api_secret, app_id);
      const client = StreamChat.getInstance(api_key, api_secret);
  
      const { users } = await client.queryUsers({id: userId});
      var thatuser = users[0];
      var successs = false


      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (await bcrypt.compare(oldPassword, user.hashedPassword)) {
          successs = true
          thatuser = user;
          break;
        }
      }
  
      if (!successs) {
        //console.log(users[0].hashedPassword)
        //const hashed = await bcrypt.hash(oldPassword, 10)
        return res
          .status(400)
          .json({ message: 'Old password is incorrect' });
      }
  
      // Hash the new password and update the user's hashed password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const token = serverClient.createUserToken(users[users.indexOf(thatuser)].id);

      //await serverClient.(users[users.indexOf(thatuser)].id, { hashedPassword });
  
      // Send a success response to the client

      res.status(200).json({ token, fullName: thatuser.fullName, username: thatuser.name, userId: thatuser.id, hashedPassword: hashedPassword, phoneNumber: thatuser.phoneNumber });
      //res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({ message: error });
    }
  };
  

module.exports = { signup, login, updatePassword }