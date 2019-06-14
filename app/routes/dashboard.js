module.exports = function(app)
{
    // route for user's dashboard
    app.get('/dashboard', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.sendFile('dashboard.html', { root: './app/views' });
        } else {
            res.redirect('/login');
        }
    });
}