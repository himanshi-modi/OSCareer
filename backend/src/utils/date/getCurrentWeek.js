const getCurrentWeek = () => {
    const today = new Date();

    const day = today.getDay(); // Sunday = 0
    const diffToMonday = day === 0 ? -6 : 1 - day;

    const weekStartDate = new Date(today);
    weekStartDate.setDate(today.getDate() + diffToMonday);
    weekStartDate.setHours(0, 0, 0, 0);

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);
    weekEndDate.setHours(23, 59, 59, 999);

    return {
        weekStartDate,
        weekEndDate
    };
};

module.exports = getCurrentWeek;