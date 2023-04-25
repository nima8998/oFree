export const getMarkedDots = (tasks) =>{

  const newMarkedDates = {};
  const dotCollection = [];
  
  for (const item in tasks) {
    const date = new Date(tasks[item].taskDate);
      const formatDate = date.toISOString().split('T')[0];

      if (tasks[item].taskDone === false) {
        dotCollection.push({date: formatDate, key: tasks[item].taskName, color: "green"})
        newMarkedDates[formatDate] = {
            dots: dotCollection.filter(dot => dot.date === formatDate),
            selectedColor: 'blue'
        };
      }
    }
    
    return newMarkedDates;
}