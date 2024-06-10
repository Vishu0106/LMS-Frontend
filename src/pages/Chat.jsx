import React, { useState } from 'react';
import axios from 'axios';
import HomeLayout from '../layouts/HomeLayout';
import { useSelector } from 'react-redux';



const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const userData = useSelector(state => state?.auth?.data);

    const options = {
        method: 'POST',
        url: 'https://chatgpt-api8.p.rapidapi.com/',
        headers: {
          'x-rapidapi-key': '64ef7bac5amshed8e41d865ad3c9p195063jsn6517df1d813a',
          'x-rapidapi-host': 'chatgpt-api8.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          '0': {
            content: 'Hello! I\'m an AI assistant bot based on ChatGPT 3. How may I help you?',
            role: 'system'
          },
          '1': {
            content: `${input}`,
            role: 'user'
          }
        }
      };

    const handleSend = async () => {
        if (input.trim() === '') return;
        const newMessage = { user: 'student', text: input };
        setMessages([...messages, newMessage]);
        setInput('');
        
        setLoading(true);
        
        // Mock API request
        try {
            const response = await axios.request(options);
            setMessages([...messages, newMessage, { user: 'teacher', text: response.data.text }]);
        } catch (error) {
            console.error('Error sending message', error);
        }
        
        setLoading(false);
    };

    return (
        <HomeLayout className="flex">
            <div className="flex flex-col h-screen bg-slate-800 p-4 pt-20">
            <div className="flex flex-1 overflow-y-auto mb-4">
                <div className="w-1/2 p-2 bg-white shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-2 text-slate-700">Student</h2>
                    <div className="h-96 overflow-y-auto space-y-2 p-2">
                        {messages.filter(msg => msg.user === 'student').map((msg, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <img 
                                    src={userData?.user?.avatar?.secure_url || 'src/assets/images/userdp.png'}
                                    alt="Student Profile" 
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="p-2 bg-blue-200 rounded-lg">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2 p-2 bg-white shadow-md rounded-lg ml-4">
                    <h2 className="text-xl font-bold text-slate-700 mb-2">Teacher</h2>
                    <div className="h-96 overflow-y-auto space-y-2 p-2">
                        {messages.filter(msg => msg.user === 'teacher').map((msg, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <img 
                                    src="src/assets/images/download.jpeg" 
                                    alt="Teacher Profile" 
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="p-2 bg-green-200 rounded-lg">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="Type your message..."
                />
                <button 
                    onClick={handleSend} 
                    className="p-2 bg-yellow-600 text-white rounded-lg"
                >
                    Send
                </button>
            </div>
            {loading && <div className="mt-2 text-center bg-slate-800">Loading...</div>}
        </div>
        </HomeLayout>
    );
};

export default Chat;
