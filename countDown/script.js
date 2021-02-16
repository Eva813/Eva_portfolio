
//https://www.w3schools.com/jsref/jsref_getfullyear.asp
const newYearTime = new Date(`January 01 ${currentYear + 1}  00:00:00`);

//getFullYear(),用來取得日期物件當中本地時間的年份
const currentYear = new Date().getFullYear();

console.log(currentYear);
console.log(newYearTime);
