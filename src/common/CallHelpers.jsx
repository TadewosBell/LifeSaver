const priorityMap = {
    "": 0,
    "wolf": 1,
    "tiger": 2,
    "demon": 3,
    "dragon": 4,
    "god": 5
}

const priorityNameMap = {
    "" : "",
    "wolf": "1 (Wolf)",
    "tiger": "2 (Tiger)",
    "demon": "3 (Demon)",
    "dragon": "4 (Dragon)",
    "god": "5 (God)"
}


export function toPriorityIndex(priority){
    return priorityMap[priority.toLowerCase()];
}

export function toPriorityName(priority){
    return priorityNameMap[priority.toLowerCase()];
}

export function sortCallsByPriority(calls){
    calls = calls.sort((a, b)=> {
        let priorityA = toPriorityIndex(a.priority);
        let priorityB = toPriorityIndex(b.priority);
        if (a.resolved) priorityA = 0;
        if (b.resolved) priorityB = 0;

        if (priorityA == priorityB)
            return b.timeReceived - a.timeReceived
        else
            return priorityB - priorityA
    })

    return calls
}