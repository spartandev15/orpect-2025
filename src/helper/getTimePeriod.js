export const  getTimePeriod=(customDate)=> {
    var currentDate = new Date();
  
    // Start date (date of joining)
    var startDate = new Date(customDate);
  
    // Difference in years 
    var yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
  
    // Difference in months
    var monthsDiff = currentDate.getMonth() - startDate.getMonth();
  
    // Adjust months if necessary
    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff = 12 + monthsDiff;
    }
  
    // Prepare the time period string
    var timePeriod = "";
    if (yearsDiff > 0) {
      timePeriod += yearsDiff + " years";
      if (monthsDiff > 0) {
        timePeriod += " ";
      }
    }
    timePeriod += monthsDiff + " months";
  
    return timePeriod;
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
    var start = new Date(startDate);
    var end = new Date(endDate);
  
    // Calculate the difference in months
    var monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  
    // Check if start date is more than 15
    if (start.getDate() > 15) {
      monthsDiff--; // Subtract 1 from monthsDiff if start date is more than 15
    }
  
    // Check if end date is more than or equal to the next month's start
    var nextMonthStart = new Date(end.getFullYear(), end.getMonth() + 1, 1);
    if (end >= nextMonthStart) {
      monthsDiff++; // Add 1 to monthsDiff if end date is more than or equal to the next month's start
    }
  
    // Calculate the number of years and remaining months
    var years = Math.floor(monthsDiff / 12);
    var months = monthsDiff % 12;
  
    // Prepare the time period string
    var timePeriod = "";
    if (years > 0) {
      timePeriod += years + " year";
      if (years > 1) {
        timePeriod += "s";
      }
      if (months > 0) {
        timePeriod += " ";
      }
    }
    if (months > 0 || timePeriod === "") {
      timePeriod += months + " month";
      if (months !== 1) {
        timePeriod += "s";
      }
    }
  
    return timePeriod;
  };
  