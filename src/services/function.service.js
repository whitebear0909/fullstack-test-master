import moment from "moment-timezone";

// get week days that include times from 8:00 to 17:00
export const getWeekDays = () => {
  var startOfWeek = moment().startOf("isoweek");
  var endOfWeek = moment().endOf("isoWeek");

  var days = [];
  var day = startOfWeek;
  while (day <= endOfWeek) {
    let times = [];
    for (let i = 8; i <= 17; i++) {
      let time = day.clone().add(i, "h");
      times.push(time.format());
    }

    const itemObj = {
      day: day.format(),
      times: times,
      disableFlg: false,
      dayNum: day.toDate().getDate(),
      month: day
        .toDate()
        .toLocaleString("default", { month: "long" })
        .substr(0, 3),
      week: day
        .toDate()
        .toLocaleString("default", { weekday: "long" })
        .substr(0, 3),
    };

    days.push(itemObj);
    day = day.clone().add(1, "d");
  }

  return days;
};

// check available time with scheduleItems
export const initWeekDays = (days, scheduleItems) => {
  days &&
    days.map((dayItem, i, dayArr) => {
      dayItem.times.map((timeItem, index, timeArr) => {
        
        for (let i = 0; i < scheduleItems.length; i++) {
          
          const start = scheduleItems[i].start.dateTime;
          const end = scheduleItems[i].end.dateTime;
          const status = scheduleItems[i].status;
          
          let schedule = {start: null, end: null, status: null};
          if (moment(timeItem).clone().add(1, "m").isBetween(start, end)) {
            schedule = {start: getHoursInTimeFormat(start), end: getHoursInTimeFormat(end), status: status};
            timeArr[index] = { time: timeItem, disableFlg: true, schedule: schedule };
            dayItem.disableFlg = true;
            break;
          } else timeArr[index] = { time: timeItem, disableFlg: false, schedule: schedule };
        }
        return timeArr;
      });
      return dayArr;
    });
  return days;
};

// get GMT offset as HH:MM String
export const getGMTOffset = () => {
  const offset = moment().utcOffset();
  const sign = offset >= 0 ? "+" : "-";
  const offsetHrs =
    Math.floor(offset / 60) >= 10
      ? Math.floor(offset / 60)
      : `0${Math.floor(offset / 60)}`;
  const offsetMins =
    Math.abs(offset % 60) >= 10
      ? Math.abs(offset % 60)
      : `0${Math.abs(offset % 60)}`;

  return sign + offsetHrs + ":" + offsetMins;
};

// get hours as HH:MM from time
export const getHoursInTimeFormat = (time) => {
  let hours = moment(time).toDate().getHours();
  let minutes = moment(time).toDate().getMinutes();
  hours = hours >= 10 ? hours : `0${hours}`;
  minutes = minutes >= 10 ? minutes : `0${minutes}`;

  return hours + ":" + minutes;
}