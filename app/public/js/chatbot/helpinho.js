var initial_message = {
    activities: [
        {
            type: 'message',
            text: "Olá! Eu sou o Helpinho, assistente virtual do Game Of Bols.\nComigo você pode buscar daily notes e tópicos.\nNo que posso ajudar?",
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

// function checkEmptyStore(){
//     let reduxStore = window.localStorage.getItem('HELPINHO_REDUX');
//     reduxStore = JSON.parse(reduxStore);
//     if (reduxStore['activities'].length > 0)
//         return false
//     return true
// }

var store = window.WebChat.createStore(
    loadStore(),
    ({ dispatch }) => next => action => {
        //console.log(action)

        // save user input in localstorage
        if (action.type === 'DIRECT_LINE/POST_ACTIVITY_PENDING') {
            const activity = action.payload.activity;
            if (activity.type === 'message'){
                updateStore(activity)
            }
        }

        // save bot respose in localstorage        
        if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
            const activity = action.payload.activity;
            if (activity.type === 'message' && activity.from.name === 'helpinho-bot'){
                updateStore(activity)
            }
        }

        // if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        //     if(checkEmptyStore()){
        //         dispatch({
        //             type: 'WEB_CHAT/SEND_EVENT',
        //             payload: {
        //                 name: 'webchat/join',
        //             }
        //         });
        //     }
        //   }

    return next(action);
    }
);

var styleOptions = {
    botAvatarImage: 'https://docs.microsoft.com/en-us/azure/bot-service/v4sdk/media/logo_bot.svg?view=azure-bot-service-4.0',
    botAvatarInitials: 'BF',
    userAvatarImage: 'https://s3.amazonaws.com/gupy5/production/companies/417/career/410/images/logo.jpg',
    userAvatarInitials: 'WC'
};

window.WebChat.renderWebChat({
    directLine: window.WebChat.createDirectLine({ token: '1N2l4XpDN30.k3H03nmx8B9JVKj7mOPZI1_9EInhDlAkMJnBaIfD9S0' }),
    store,
    styleOptions
}, document.getElementById('webchat'));

document.querySelector('#webchat > *').focus();