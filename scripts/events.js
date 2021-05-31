import { EventList } from "../constants";

export function initializeEvents() {
    let e = EventList;
    e.forEach((x) => {
        if (x.date === "") {
            let today = new Date();
            if (today.getHours() > parseInt(x.time.substr(0, 2))) {
                today.setDate(today.getDate() + 1)
            }
            x.date = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth()+1).toString().padStart(2, '0')}/${today.getFullYear()}`
        }
        let time = x.time.split(':');
        let parts = x.date.split('/');
        time[0] = parseInt(time[0]) + 2;
        x.datetime = `${parts[2]}-${parts[1]}-${parts[0]}T${time[0]}:${time[1]}:00Z`
    })

    e = e.filter((x) => {
        var date = Date.parse(x.datetime);
        const curDate = new Date();
        if (date > curDate ) {
            return x;
        }
    })

    e.sort((a, b) =>{
        return (a.datetime < b.datetime) ? -1 : ((a.datetime > b.datetime) ? 1 : 0);
    });

    return e;
}
