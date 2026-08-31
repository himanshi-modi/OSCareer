const getCurrentWeek = require("./getCurrentWeek");

const getPreviousWeek = () => {
    const { weekStartDate, weekEndDate } = getCurrentWeek();

    const previousWeekStartDate = new Date(weekStartDate);
    previousWeekStartDate.setDate(
        previousWeekStartDate.getDate() - 7
    );

    const previousWeekEndDate = new Date(weekEndDate);
    previousWeekEndDate.setDate(
        previousWeekEndDate.getDate() - 7
    );

    return {
        weekStartDate: previousWeekStartDate,
        weekEndDate: previousWeekEndDate
    };
};

module.exports = getPreviousWeek;