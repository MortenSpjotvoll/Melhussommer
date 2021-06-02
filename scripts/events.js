import { EventList } from "../constants";

function shittyIsoConverter(time, date) {
    let hhmm = time.split(':');
    let ddmmyyyy = date.split('/');
    hhmm[0] = parseInt(hhmm[0]) + 2; // Superb shittyness. Adds +2 hours because we are in GMT+2, this application is only relevant this summer and summer savings aren't until November

    return `${ddmmyyyy[2]}-${ddmmyyyy[1]}-${ddmmyyyy[0]}T${hhmm[0]}:${hhmm[1]}:00Z`;
}

export function initializeEvents() {
    let e = EventList;
    e.forEach((x) => {
        if (x.date === "") {
            let today = new Date();
            let firstDate = Date.parse(shittyIsoConverter(x.time, x.dateFirst));
            let lastDate = Date.parse(shittyIsoConverter(x.time, x.dateLast));
            let shouldGoNextDay = true;
            if (today > lastDate) {
                x.datetime = null;
                return;
            }  else if (today < firstDate) {
                today = new Date(firstDate);
                shouldGoNextDay = false;
            }
            if (shouldGoNextDay && today.getHours() > parseInt(x.time.substr(0, 2))) {
                today.setDate(today.getDate() + 1)
            }
            x.date = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`
        }
        x.datetime = shittyIsoConverter(x.time, x.date)
    })

    e = e.filter((x) => {
        if(typeof x.datetime === "undefined") {
            return;
        }
        var date = Date.parse(x.datetime);
        const curDate = new Date();
        if (date > curDate) {
            return x;
        }
    })

    e.sort((a, b) => {
        return (a.datetime < b.datetime) ? -1 : ((a.datetime > b.datetime) ? 1 : 0);
    });

    return e;
}
