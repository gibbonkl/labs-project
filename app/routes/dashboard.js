module.exports = function(app)
{
    // route for user's dashboard
    app.get('/dashboard', (req, res) => {
        console.log("DASHBOARD");
        console.log(req.cookies);
        console.log(req.session.user);
        if (req.session.user && req.cookies.user_sid) {
            console.log("SESSION E COOKIES")
            res.render('dashboard');
            //res.sendFile('dashboard.html', { root: './app/views' });
        } else {
            res.redirect('/login');
        }
    });
}