import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';

import 'stream-chat-react/dist/css/index.css';
import './Appnight.css';


const cookies = new Cookies();

const apiKey = 'c2eh6kvwxvc9';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}

const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    if(!authToken) return <Auth />
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        
        <div className={`app__wrapper ${darkMode ? "night" : ""}`}>
            
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
                
            </Chat>
            <div className="channel-list__sidebar__icon2" onClick={toggleDarkMode}>
            <div className="icon1__inner">
                <span role="img" aria-label="Toggle Dark Mode">
                {darkMode ? '☀️' : '🌙'}
                </span>
            </div>
            </div>

            
        </div>
    );
}

export default App;
