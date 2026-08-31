const getWeekKey = (date) => {

    const startOfYear =
        new Date(date.getFullYear(), 0, 1);

    const days =
        Math.floor(
            (date - startOfYear) /
            (24 * 60 * 60 * 1000)
        );

    const week =
        Math.ceil(
            (days + startOfYear.getDay() + 1) / 7
        );

    return `${date.getFullYear()}-W${String(
        week
    ).padStart(2, "0")}`;
};

module.exports={getWeekKey};