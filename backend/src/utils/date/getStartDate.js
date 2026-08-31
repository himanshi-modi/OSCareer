const getStartDate = (period) => {

    const date = new Date();

    switch (period) {

        case "7d":
            date.setDate(date.getDate() - 7);
            break;

        case "30d":
            date.setDate(date.getDate() - 30);
            break;

        case "3m":
            date.setMonth(date.getMonth() - 3);
            break;

        case "6m":
            date.setMonth(date.getMonth() - 6);
            break;

        case "1y":
            date.setFullYear(
                date.getFullYear() - 1
            );
            break;

        default:
            date.setMonth(
                date.getMonth() - 6
            );
    }

    return date;
};


module.exports={getStartDate};