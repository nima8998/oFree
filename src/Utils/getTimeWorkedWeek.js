export const getTimeWorkedWeek = (
  workData
) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek);

  let days = [];
  let hours = [0, 0, 0, 0, 0, 0, 0];
    
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + i);
    const dateString = new Date(currentDate);
    const dayOfWeek = `${dateString.getDate()}/${dateString.getMonth()}`;
    days.push(dayOfWeek);
  }
  


  for (let i = 0; i < workData.length; i++) {
    const date = workData[i].reportDay;
    const dateString = new Date(date);
    const dayOfWeek = dateString.getDay();

    hours[dayOfWeek] += (workData[i].hours + (workData[i].minutes / 60) + (workData[i].seconds / 3600));
  }


  const hoursFixed = hours.map(value => {
    return parseFloat((Math.round(value * 100) / 100).toFixed(2));
  });
  
  // console.log(days)
  // console.log(formattedHours)

  // const result = {
  //   days,
  //   hours
  // }

  // return {days, hoursFixed};
  return hoursFixed;
}