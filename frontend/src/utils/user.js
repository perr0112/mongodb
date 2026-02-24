const isAdmin = (user) => {
    const { role } = user

    return role === "admin"
}

const getIdentity = (user) => {
    if (!user.lastName) return user.firstName

    const { firstName, lastName } = user

    return `${firstName} ${lastName}`
}

export {
    isAdmin,
    getIdentity,
}
