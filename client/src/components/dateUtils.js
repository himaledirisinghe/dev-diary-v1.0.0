export function getDateTime() {
    let tempDate = new Date();
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth() + 1;
    let date = tempDate.getDate();
    let hours = tempDate.getHours();
    let minutes = tempDate.getMinutes();
    let seconds = tempDate.getSeconds();
  
    // Add leading zeros to month, date, hours,
    // minutes and seconds if needed
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    return year + '/' + month + '/' + date + ' ' + hours + ':' + minutes + ':' + seconds;
  }