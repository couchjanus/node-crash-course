// const {promisify} = require('util');
// const crypto = require('crypto');
const passport = require('passport');
const models = require('../../entities');

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const randomBytesAsync = promisify(crypto.randomBytes);

module.exports = {

    /**
     * GET /login
     * Login page.
     */

    login_get: (req, res, next) => {
        if (req.user) {
            return res.redirect('/');
        }
        res.render('auth/login', {
            title: 'Login'
        });
    },

    /**
     * POST /login
     * Sign in using email and password.
     */

    login_post: (req, res, next) => {
 
        // req.assert('email', 'Email is not valid').isEmail();
        // req.assert('password', 'Password cannot be blank').notEmpty();
        // req.sanitize('email').normalizeEmail({gmail_remove_dots: false});

        // const errors = req.validationErrors();

        // if (errors) {
        //     req.flash('errors', errors);
        //     return res.redirect('/login');
        // }
        
        passport.authenticate('local', { failureRedirect: '/login' }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.flash('errors', info);
                return res.redirect('/login');
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash('success', {msg: 'Success! You are logged in.'});
                res.redirect(req.session.returnTo || '/');
            });
        })(req, res, next);
    },

    /**
     * GET /logout
     * Log out.
     */
    logout_get: (req, res) => {
        req.logout();
        req.session.destroy((err) => {
            if (err) console.log('Error : Failed to destroy the session during logout.', err);
            req.user = null;
            res.redirect('/');
        });
    },

    /**
     * GET /signup
     * Signup page.
     */
    signup_get: (req, res) => {
        if (req.user) {
            return res.redirect('/');
        }
        res.render('auth/signup', {
            title: 'Create Account'
        });
    },

    /**
     * POST /signup
     * Create a new local account.
     */
    signup_post: (req, res, next) => {
        // req.assert('email', 'Email is not valid').isEmail();
        // req.assert('password', 'Password must be at least 4 characters long').len(4);
        // req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
        // req.sanitize('email').normalizeEmail({gmail_remove_dots: false});

        // const errors = req.validationErrors();

        // if (errors) {
        //     req.flash('errors', errors);
        //     return res.redirect('/signup');
        // }

        const user = new models.User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.email,
        });

        models.User.findOne({email: req.body.email}, (err, existingUser) => {
            if (err) {
                return next(err);
            }
            if (existingUser) {
                req.flash('errors', {msg: 'Account with that email address already exists.'});
                return res.redirect('/signup');
            }
            user.save((err) => {
                if (err) {
                    return next(err);
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');
                });
            });
        });
    },

    /**
     * GET /account
     * Profile page.
     */
    account_get: (req, res) => {
        res.render('account/profile', {
            title: 'Account Management'
        });
    },

    /**
     * POST /account/profile
     * Update profile information.
     */
    update_profile_post: (req, res, next) => {
        req.assert('email', 'Please enter a valid email address.').isEmail();
        req.sanitize('email').normalizeEmail({gmail_remove_dots: false});

        const errors = req.validationErrors();

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('/account');
        }

        User.findById(req.user.id, (err, user) => {
            if (err) {
                return next(err);
            }
            user.email = req.body.email || '';
            user.profile.name = req.body.name || '';
            user.profile.gender = req.body.gender || '';
            user.profile.location = req.body.location || '';
            user.profile.website = req.body.website || '';
            user.save((err) => {
                if (err) {
                    if (err.code === 11000) {
                        req.flash('errors', {msg: 'The email address you have entered is already associated with an account.'});
                        return res.redirect('/account');
                    }
                    return next(err);
                }
                req.flash('success', {msg: 'Profile information has been updated.'});
                res.redirect('/account');
            });
        });
    },

    /**
     * POST /account/password
     * Update current password.
     */
    update_password_post: (req, res, next) => {
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

        const errors = req.validationErrors();

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('/account');
        }

        User.findById(req.user.id, (err, user) => {
            if (err) {
                return next(err);
            }
            user.password = req.body.password;
            user.save((err) => {
                if (err) {
                    return next(err);
                }
                req.flash('success', {msg: 'Password has been changed.'});
                res.redirect('/account');
            });
        });
    },

    /**
     * POST /account/delete
     * Delete user account.
     */
    delete_account_post: (req, res, next) => {
        User.remove({_id: req.user.id}, (err) => {
            if (err) {
                return next(err);
            }
            req.logout();
            req.flash('info', {msg: 'Your account has been deleted.'});
            res.redirect('/');
        });
    },

    /**
     * GET /account/unlink/:provider
     * Unlink OAuth provider.
     */
    oauth_unlink_get: (req, res, next) => {
        const {provider} = req.params;
        User.findById(req.user.id, (err, user) => {
            if (err) {
                return next(err);
            }
            user[provider] = undefined;
            user.tokens = user.tokens.filter(token => token.kind !== provider);
            user.save((err) => {
                if (err) {
                    return next(err);
                }
                req.flash('info', {msg: `${provider} account has been unlinked.`});
                res.redirect('/account');
            });
        });
    },

    /**
     * GET /reset/:token
     * Reset Password page.
     */
    reset_get: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        User
            .findOne({passwordResetToken: req.params.token})
            .where('passwordResetExpires').gt(Date.now())
            .exec((err, user) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.flash('errors', {msg: 'Password reset token is invalid or has expired.'});
                    return res.redirect('/forgot');
                }
                res.render('auth/reset', {
                    title: 'Password Reset'
                });
            });
    },

    /**
     * POST /reset/:token
     * Process the reset password request.
     */
    reset_post: (req, res, next) => {
        req.assert('password', 'Password must be at least 4 characters long.').len(4);
        req.assert('confirm', 'Passwords must match.').equals(req.body.password);

        const errors = req.validationErrors();

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('back');
        }

        const resetPassword = () =>
            User
                .findOne({passwordResetToken: req.params.token})
                .where('passwordResetExpires').gt(Date.now())
                .then((user) => {
                    if (!user) {
                        req.flash('errors', {msg: 'Password reset token is invalid or has expired.'});
                        return res.redirect('back');
                    }
                    user.password = req.body.password;
                    user.passwordResetToken = undefined;
                    user.passwordResetExpires = undefined;
                    return user.save().then(() => new Promise((resolve, reject) => {
                        req.logIn(user, (err) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve(user);
                        });
                    }));
                });

        const sendResetPasswordEmail = (user) => {
            if (!user) {
                return;
            }

            const msg = {
                to: user.email,
                from: 'hackathon@starter.com',
                subject: 'Your Hackathon Starter password has been changed',
                html: `<h3>Hello,</h3>
                    <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`
            };
            sgMail.send(msg);
            req.flash('success', {msg: 'Success! Your password has been changed.'});
        };

        resetPassword()
            .then(sendResetPasswordEmail)
            .then(() => {
                if (!res.finished) res.redirect('/');
            })
            .catch(err => next(err));
    },

    /**
     * GET /forgot
     * Forgot Password page.
     */
    forgot_get: (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        res.render('auth/forgot', {
            title: 'Forgot Password'
        });
    },

    /**
     * POST /forgot
     * Create a random token, then the send user an email with a reset link.
     */
    forgot_post: (req, res, next) => {
        req.assert('email', 'Please enter a valid email address.').isEmail();
        req.sanitize('email').normalizeEmail({gmail_remove_dots: false});

        const errors = req.validationErrors();

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('/forgot');
        }

        const createRandomToken = randomBytesAsync(16)
            .then(buf => buf.toString('hex'));

        const setRandomToken = token =>
            User
                .findOne({email: req.body.email})
                .then((user) => {
                    if (!user) {
                        req.flash('errors', {msg: 'Account with that email address does not exist.'});
                    } else {
                        user.passwordResetToken = token;
                        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                        user = user.save();
                    }
                    return user;
                });

        const sendForgotPasswordEmail = (user) => {
            if (!user) {
                return;
            }
            const token = user.passwordResetToken;
            const msg = {
                to: user.email,
                from: 'hackathon@starter.com',
                subject: 'Reset your password on Hackathon Starter',
                html: `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
                    <p>Please click on the following link, or paste this into your browser to complete the process: </p>
                    <a href="http://${req.headers.host}/reset/${token}">http://${req.headers.host}/reset/${token}</a>
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
            };
            sgMail.send(msg);
            req.flash('info', {msg: `An e-mail has been sent to ${user.email} with further instructions.`});
        };

        createRandomToken
            .then(setRandomToken)
            .then(sendForgotPasswordEmail)
            .then(() => res.redirect('/forgot'))
            .catch(next);
    }
}