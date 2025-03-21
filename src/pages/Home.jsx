import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Firebase';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import '../styles/home.css'

const db = getFirestore();

function Home() {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (cre) => {
            if (cre) {
                setUser(cre.email);
            }
        });
    }, []);

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data());
            });
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            try {
                await addDoc(collection(db, "messages"), {
                    user: user,
                    text: message,
                    createdAt: new Date()
                });
                setMessage('');
            } catch (error) {
                console.error("Mesaj gönderilirken hata oluştu: ", error);
            }
        }
    }

    return (
        <div>
            <Navbar />
            <h1> Hoşgeldin {user} </h1>
            <div className="chat-box">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className="message">
                            <strong>{msg.user}:</strong> {msg.text}
                        </div>
                    ))}
                </div>

                <form className='msg' onSubmit={sendMessage}>
                    <input
                        className='msg-input'
                        type="text"
                        placeholder="Mesajınızı yazın..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className='msg-btn' type="submit">Gönder</button>
                </form>

            </div>
        </div>
    )
}

export default Home;


