import React, { useState, useEffect } from 'react';

export default function Chatwoot() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const setUserData = () => {
        const userIdentifier = `guest_${Math.random().toString(36).substring(2, 10)}`;
        const name = '';
        const email = '';
        const phoneNumber = '';

        if (window.$chatwoot) {
            window.$chatwoot.setUser(userIdentifier, {
                email: email,
                name: name,
                phone_number: phoneNumber,
            });
        }
    };

    const initializeChatwoot = () => {
        const script = document.createElement('script');
        script.src = 'https://app.chatwoot.com/packs/js/sdk.js';
        script.async = true;
        script.defer = true;

        script.onload = () => {
            window.chatwootSettings = {
                hideMessageBubble: false,
                showUnreadMessagesDialog: true,
                position: "right",
                locale: "uk",
                useBrowserLanguage: false,
                type: "bubble",
                launcherTitle: "Чат з нами",
                darkMode: "auto"
            };

            window.chatwootSDK.run({
                websiteToken: 'xzSie1LFLzw8W87aGP4W8Zvt',
                baseUrl: 'https://app.chatwoot.com'
            });
        };

        document.body.appendChild(script);
    };

    useEffect(() => {
        initializeChatwoot();

        window.addEventListener('chatwoot:ready', setUserData);

        return () => {
            window.removeEventListener('chatwoot:ready', setUserData);
        };
    }, []);

    const toggleChat = () => {
        setIsChatOpen(prevState => !prevState);
        if (isChatOpen) {
            window.$chatwoot.hide();
        } else {
            window.$chatwoot.toggle();
        }
    };

    return (
        <div className='z-30'>
            <button onClick={toggleChat}></button>
        </div>
    );
}