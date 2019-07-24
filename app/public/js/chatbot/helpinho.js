const store = window.WebChat.createStore(
    {},
    ({ dispatch }) => next => action => {
        if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        const event = new Event('webchatincomingactivity');

        event.data = action.payload.activity;
        window.dispatchEvent(event);
        }

    return next(action);
    }
);

window.WebChat.renderWebChat({
    directLine: window.WebChat.createDirectLine({ token: '3y5fPZhwLfE.ASfIdTbH0uY9l1gl_oNZthZ4J96T5M_S6HssbA8Nty4' }), store
}, document.getElementById('webchat'));

window.addEventListener('webchatincomingactivity', ({ data }) => {         
    //console.log(`Received an activity of type "${ data.type }":`);
    console.log('Cpx falou:')
    console.log(data);       
});

document.querySelector('#webchat > *').focus();
