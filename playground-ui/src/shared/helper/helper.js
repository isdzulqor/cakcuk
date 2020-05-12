export function scrollInto(event = null, marginTop = 0, target) {
    let goTo;
    if (event != null) {
        goTo = event.target.getAttribute("goTo");
    } else {
        goTo = target
    }
    try {
        let e = document.getElementById(goTo);
        let dims = e.getBoundingClientRect();
        window.scrollBy({
            top: dims.top - marginTop,
            behavior: 'smooth'
        });
    } catch (e) {
        return
    }
}

export function jsonPretty(jsonString) {
    try {
        return JSON.stringify(JSON.parse(jsonString), null, 4);
    } catch (e) {
        return jsonString
    }
}

export function uuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function getTeamID() {
    let teamID = localStorage.getItem('_teamID');
    if (teamID) {
        return teamID
    }
    teamID = uuidV4()
    localStorage.setItem('_teamID', teamID);
    return teamID
}