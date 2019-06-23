module.exports = function(app)
{
    // route for user logout
    app.get('/logout', (req, res) => {

        console.log('user ' + req.session.user);
        console.log('cookie ' + req.cookies.user_sid);

        if (req.session.user && req.cookies.user_sid) 
        {
            res.clearCookie('user_sid');
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });
}