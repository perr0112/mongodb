
/**
 * Check if there is an existing user in the session
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export function isConnected(req, res, next) {
    const currentUser = req.session.user;

    if (!currentUser) {
        return res.redirect('/auth/login');
    }

    next();
}

export function isAdmin(req, res, next) {
    const currentUser = req.session.user;

    if (!currentUser) return

    const { role } = currentUser

    if (role !== "admin") {
        return res.render('error',
            { message: "Vous devez être connecté en tant qu'administrateur pour réaliser cette action." }
        )
    }

    next();
}
