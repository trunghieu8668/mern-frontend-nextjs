exports.userSignupValidator = (req, res, next)=>{
    req.check('usergroup', 'UserGroup is required').notEmpty();
    req.check('userName', 'UserName is required').notEmpty();
    req.check('userEmail', 'Email must be between 03 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min:4, max:32
        });
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
    .isLength({min:6})
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number');
    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(404).json({error: firstError})
    }
    next()
}
