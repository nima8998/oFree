export const getTimeWorkedWeek = (
  workData
) => {
  const dayIndexHours = [0, 0, 0, 0, 0, 0, 0];
  
  for (let i = 0; i < workData.length; i++) {
    const date = workData[i].reportDay;
    const dateString = new Date(date);
    const dayOfWeek = dateString.getDay();

    dayIndexHours[dayOfWeek] += (workData[i].hours + (workData[i].minutes / 60) + (workData[i].seconds / 3600));
  }

  const formattedHours = dayIndexHours.map(value => {
    return parseFloat((Math.round(value * 100) / 100).toFixed(2));
  });
  return formattedHours;
}