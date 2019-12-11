export function toRoleIndex(user){
    if (user.isFirstResponder)
        return 5;
    if (user.isVolunteer)
        return 4;    
    if (user.isCallSpecialist)
        return 3;    
    if (user.isMissionManagement)
        return 2;
    if (user.isOperationsChief)
        return 1;
}

export function sortUsersByRole(calls){
    calls = calls.sort((a, b)=> {
        let priorityA = toRoleIndex(a);
        let priorityB = toRoleIndex(b);

        if (priorityA == priorityB)
            return a.firstName.localeCompare(b.firstName)
        else
            return priorityB - priorityA
    })

    return calls
}