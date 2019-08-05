var initial_message = {
    activities: [
        {
            type: "message",
            attachmentLayout: "list",
            attachments: [
                {
                    content: {
                        type: "AdaptiveCard",
                        "body": [
                            {
                                "type": "Image",
                                "altText": "Helpinho",
                                "url": "https://cdn.dribbble.com/users/722835/screenshots/4082720/bot_icon.gif",
                                "size": "Large",
                                "horizontalAlignment": "Center"
                            },
                            {
                                "type": "RichTextBlock",
                                "inlines": [
                                    {
                                        "type": "TextRun",
                                        "text": "Olá! Eu sou o Helpinho, assistente virtual do Game Of Bols."
                                    }
                                ],
                                "horizontalAlignment": "Center",
                                "height": "stretch"
                            },
                            {
                                "type": "RichTextBlock",
                                "inlines": [
                                    {
                                        "type": "TextRun",
                                        "text": "Comigo você pode buscar DailyNotes, postagens no nosso HelpCenter ou tirar dúvidas sobre a plataforma!"
                                    }
                                ],
                                "horizontalAlignment": "Center",
                                "height": "stretch"
                            },
                            {
                                "type": "RichTextBlock",
                                "inlines": [
                                    {
                                        "type": "TextRun",
                                        "text": "No que posso ajudar?"
                                    }
                                ],
                                "height": "stretch",
                                "horizontalAlignment": "Center"
                            }
                        ],
                        type: "AdaptiveCard",
                        version: "1.0",
                    },
                    contentType: "application/vnd.microsoft.card.adaptive",
                }
            ],
            from: {
                id: 'helpinho-bot',
                name: 'helpinho-bot',
                role: 'bot'
            },
            timestamp: new Date()
        }
    ]
}

function loadStore(){
    let reduxStore = window.localStorage.getItem('HELPINHO_REDUX') ? window.localStorage.getItem('HELPINHO_REDUX') : JSON.stringify(initial_message);
    if (reduxStore == JSON.stringify(initial_message)){
        window.localStorage.setItem('HELPINHO_REDUX', reduxStore)
    }

    return JSON.parse(reduxStore);
}

function updateStore(activity){
    //console.log(activity.text)
    let reduxStore = window.localStorage.getItem('HELPINHO_REDUX');
    reduxStore = JSON.parse(reduxStore);
    reduxStore['activities'].push(activity)
    window.localStorage.setItem('HELPINHO_REDUX', JSON.stringify(reduxStore));
}

function checkEmptyStore(){
    let reduxStore = window.localStorage.getItem('HELPINHO_REDUX');
    reduxStore = JSON.parse(reduxStore);
    if (reduxStore['activities'].length > 0)
        return false
    return true
}

var store = window.WebChat.createStore(
    loadStore(),
    ({ dispatch }) => next => action => {
        //console.log(action)

        // save conversations in localstorage        
        if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
            const activity = action.payload.activity;
            if (activity.type === 'message') {
                activity.timestamp = new Date();

                updateStore(activity)
            }
        }

    return next(action);
    }
);

var styleOptions = {
    botAvatarImage: 'https://docs.microsoft.com/en-us/azure/bot-service/v4sdk/media/logo_bot.svg?view=azure-bot-service-4.0',
    botAvatarInitials: 'HP',
    userAvatarImage: 'https://s3.amazonaws.com/gupy5/production/companies/417/career/410/images/logo.jpg',
    userAvatarInitials: 'US'
};

window.WebChat.renderWebChat({
    directLine: window.WebChat.createDirectLine({ token: '1N2l4XpDN30.k3H03nmx8B9JVKj7mOPZI1_9EInhDlAkMJnBaIfD9S0' }),
    store,
    styleOptions
}, document.getElementById('webchat'));

document.querySelector('#webchat > *').focus();