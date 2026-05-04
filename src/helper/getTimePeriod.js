import moment from 'moment';

export const getTimePeriod = (customDate) => {
  if (!customDate) return "";
  
  const currentDate = moment();
  const startDate = moment(customDate);
  
  // Calculate the difference
  const years = currentDate.diff(startDate, 'years');
  const months = currentDate.diff(startDate.clone().add(years, 'years'), 'months');
  const days = currentDate.diff(startDate.clone().add(years, 'years').add(months, 'months'), 'days');
  
  // Prepare the time period string
  const parts = [];
  
  if (years > 0) {
    parts.push(years + (years === 1 ? " year" : " years"));
  }
  
  if (months > 0) {
    parts.push(months + (months === 1 ? " month" : " months"));
  }
  
  if (days > 0) {
    parts.push(days + (days === 1 ? " day" : " days"));
  }
  
  // If no time has passed, return "0 days"
  if (parts.length === 0) {
    return "0 days";
  }
  
  return parts.join(" ");
}







  // export const getExEmployeeTime = (startDate, endDate) => {
  //   var start = new Date(startDate);
  //   var end = new Date(endDate);
  
  //   // Calculate the difference in months
  //   var monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  
  //   // Calculate the number of years and remaining months
  //   var years = Math.floor(monthsDiff / 12);
  //   var months = monthsDiff % 12;
  
  //   // Prepare the time period string
  //   var timePeriod = "";
  //   if (years > 0) {
  //     timePeriod += years + " year";
  //     if (years > 1) {
  //       timePeriod += "s";
  //     }
  //     if (months > 0) {
  //       timePeriod += " ";
  //     }
  //   }
  //   if (months > 0) {
  //     timePeriod += months + " months";
  //   }
  
  //   return timePeriod;
  // };
  

  // export const getExEmployeeTime = (startDate, endDate) => {
  //   var start = new Date(startDate);
  //   var end = new Date(endDate);
    
  //   // Calculate the difference in months
  //   var monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
  //   // Check if start date is more than 15
  //   if (start.getDate() > 15) {
  //     monthsDiff--; // Subtract 1 from monthsDiff if start date is more than 15
  //   }
    
  //   // Check if end date is more than or equal to the next month's start
  //   var nextMonthStart = new Date(end.getFullYear(), end.getMonth() + 1, 1);
  //   if (end >= nextMonthStart) {
  //     monthsDiff++; // Add 1 to monthsDiff if end date is more than or equal to the next month's start
  //   }
    
  //   // Calculate the number of years and remaining months
  //   var years = Math.floor(monthsDiff / 12);
  //   var months = monthsDiff % 12;
    
  //   // Prepare the time period string
  //   var timePeriod = "";
  //   if (years > 0) {
  //     timePeriod += years + " year";
  //     if (years > 1) {
  //       timePeriod += "s";
  //     }
  //     if (months > 0) {
  //       timePeriod += " ";
  //     }
  //   }
  //   if (months > 0) {
  //     timePeriod += months + " month";
  //     if (months > 1) {
  //       timePeriod += "s";
  //     }
  //   }
    
  //   return timePeriod;
  // };
  



export const getExEmployeeTime = (startDate, endDate) => {
  if (!startDate || !endDate) return "";
  
  const start = moment(startDate);
  const end = moment(endDate);
  
  // Calculate the difference
  const years = end.diff(start, 'years');
  const months = end.diff(start.clone().add(years, 'years'), 'months');
  const days = end.diff(start.clone().add(years, 'years').add(months, 'months'), 'days');
  
  // Prepare the time period string
  const parts = [];
  
  if (years > 0) {
    parts.push(years + (years === 1 ? " year" : " years"));
  }
  
  if (months > 0) {
    parts.push(months + (months === 1 ? " month" : " months"));
  }
  
  if (days > 0) {
    parts.push(days + (days === 1 ? " day" : " days"));
  }
  
  // If no time has passed, return "0 days"
  if (parts.length === 0) {
    return "0 days";
  }
  
  return parts.join(" ");
};
  