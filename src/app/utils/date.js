function displayDate(ms) {
    const date = new Date(parseInt(ms));

    const currentDate = new Date();

    const yearDiff = currentDate.getFullYear() - date.getFullYear();

    if (yearDiff === 0) {
        const monthDiff = currentDate.getMonth() - date.getMonth();

        if (monthDiff === 0) {
            const dayDiff = currentDate.getDate() - date.getDate();

            if (dayDiff === 0) {
                const hourDiff = Math.floor((currentDate - date) / 3600000);

                if (hourDiff === 0) {
                    const minuteDiff = Math.floor((currentDate - date) / 60000);

                    if (minuteDiff === 0) {
                        return "только что";
                    } else if (minuteDiff === 1) {
                        return "минуту назад";
                    } else if (minuteDiff <= 5) {
                        return `${minuteDiff} минуты назад`;
                    } else if (minuteDiff <= 10) {
                        return `${minuteDiff} минут назад`;
                    } else {
                        return `${minuteDiff} минут назад`;
                    }
                } else {
                    return `${hourDiff} часов назад`;
                }
            } else {
                return `${date.getDate()} ${getMonthName(
                    date.getMonth()
                )} ${formatYear(
                    date.getFullYear(),
                    currentDate.getFullYear()
                )}`;
            }
        } else {
            return `${date.getDate()} ${getMonthName(
                date.getMonth()
            )} ${formatYear(date.getFullYear(), currentDate.getFullYear())}`;
        }
    } else {
        return `${date.getDate()} ${getMonthName(
            date.getMonth()
        )} ${date.getFullYear()}`;
    }
}

function formatYear(year, currentYear) {
    return year === currentYear ? "" : year;
}

function getMonthName(month) {
    const monthNames = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ];

    return monthNames[month];
}

export default displayDate;
