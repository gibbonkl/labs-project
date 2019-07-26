function setStore(){
    const reduxStore = window.localStorage.getItem('HELPINHO_REDUX') ? window.localStorage.getItem('HELPINHO_REDUX') : "{}";
    //console.log(JSON.parse(reduxStore))
    return JSON.parse(reduxStore);
}

var store = window.WebChat.createStore(
    setStore(),
    ({ dispatch }) => next => action => {
        //console.log(action)
        if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
            const event = new Event('webchatincomingactivity');

            event.data = action.payload.activity;
            window.dispatchEvent(event);
        }
    return next(action);
    }
);

store.subscribe(() => {
    console.log(store.getState())
    window.localStorage.setItem('HELPINHO_REDUX', JSON.stringify(store.getState()));
});

var styleOptions = {
    botAvatarImage: 'https://docs.microsoft.com/en-us/azure/bot-service/v4sdk/media/logo_bot.svg?view=azure-bot-service-4.0',
    botAvatarInitials: 'BF',
    userAvatarImage: 'https://github.com/compulim.png?size=64',
    userAvatarInitials: 'WC'
};

window.addEventListener('webchatincomingactivity', ({ data }) => {         
    //console.log(`Received an activity of type "${ data.type }":`);
    //console.log('Cpx falou:')
    //console.log(data);
    // if (data.text == 'log'){
    //     alert('foi!');
    // }
    //window.localStorage.setItem('HELPINHO_REDUX', JSON.stringify(data));
});

window.WebChat.renderWebChat({
    directLine: window.WebChat.createDirectLine({ token: 'JI8fwLcqlPc.Z2ndfkX9okej3IQNL68SvwcWt0b5si39-ektmyb86dk' }),
    store,
    styleOptions
}, document.getElementById('webchat'));

document.querySelector('#webchat > *').focus();