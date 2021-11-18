module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //store the URL they are requesting.
        req.session.returnTo = req.originalUrl
        req.flash('Error','You Must Be Signed In First!');
        return res.redirect('/login');
    }
    next()
}