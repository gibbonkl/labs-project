var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function(app)
{
    // initialize cookie-parser to allow us access the cookies stored in the browser. 
    app.use(cookieParser());
    
    // initialize express-session to allow us track the logged-in user across sessions.
    app.use(session({
        key: 'user_sid',
        secret: 'somerandonstuffs',
        resave: false,
        saveUninitialized: false,
        rolling: false,
        cookie: {
            expires: 300000000
        }
    }));
    
    
    // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
    // This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
    app.use((req, res, next) => {
        if (req.cookies.user_sid && !req.session.user) {
            res.clearCookie('user_sid');        
        }
        next();
    });
    
    return app;
}