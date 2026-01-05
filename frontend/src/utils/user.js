const isAdmin = (user) => {
    const { role } = user

    return role === "admin"
}

const getIdentity = (user) => {
    const { firstName, lastName } = user

    return `${firstName} ${lastName}`
}

export {
    isAdmin,
    getIdentity,
}
