import { compareAsc,format, formatDistance , subDays } from "date-fns";
format(new Date(2014,1,11), "yyy-MM-dd");

const dates = [
    new Date(1994,3,4),
    new Date(2024,3,23),
    new Date(2025,4,8),

];

function dateValue(){
   console.log( dates.sort(compareAsc));
   console.log(new Date())
   console.log(formatDistance(subDays(new Date(), 4), new Date(), { addSuffix: true }));
    console.log(formatDistance(subDays(dates)))
}

export { dateValue }