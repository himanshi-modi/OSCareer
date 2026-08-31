const getWeekRange = (date = new Date()) => {

    const currentDate = new Date(date);

    const day = currentDate.getDay();

    // Monday = start of week
    const diffToMonday = day === 0 ? -6 : 1 - day;

    const weekStartDate = new Date(currentDate);
    weekStartDate.setDate(currentDate.getDate() + diffToMonday);
    weekStartDate.setHours(0, 0, 0, 0);

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);
    weekEndDate.setHours(23, 59, 59, 999);

    return {
        weekStartDate,
        weekEndDate
    };

};

module.exports = {
    getWeekRange
};