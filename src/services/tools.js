/**
 * Returns the date in spanish format.
 *
 * @param date Date to format.
 *
 * @returns {`${string}, ${number} de ${string} de ${number}`}
 */
export const formatDate = (date) => {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
            "Octubre", "Noviembre", "Diciembre"];

    return `${formatDay(date.getDay())}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

/**
 * Returns the integer day in spanish format.
 *
 * @param day Day to format.
 *
 * @returns {string}
 */
export const formatDay = (day) => {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    return days[day];
};

/**
 * Increments an hours passed like "09:00:00" with the variable minutsIncrement passed.
 *
 * @param hour The hour to increment.
 * @param minutsIncrement The quantity of minuts to increment.
 *
 * @returns {string}
 */
export const incrementHour = (hour, minutsIncrement) => {
    const splitHour = hour.split(':');
    const incrementHours = Math.floor(minutsIncrement / 60);
    const incrementsMinuts = minutsIncrement % 60;

    let minuts = parseInt(splitHour[1]) + incrementsMinuts;
    let restHour = Math.floor(minuts / 60);
    let restMinut = minuts % 60;

    restMinut = restMinut > 9 ? restMinut : '0' + restMinut;

    let hours = parseInt(splitHour[0]) + incrementHours + restHour;
    hours = hours > 9 ? hours : '0' + hours;

    return hours + ':' + restMinut + ':' + splitHour[2];
}

/**
 * Returns if the first hour is greater than the seconds.
 *
 * @param greaterHour An hour with "09:00:00" format.
 * @param hour An hour with "09:00:00" format.
 *
 * @returns {boolean}
 */
export const isGreaterThan = (greaterHour, hour) => {
    const splitGreaterHour = greaterHour.split(':');
    const splitHour = hour.split(':');

    return splitGreaterHour[0] > splitHour[0] || splitGreaterHour[1] > splitHour[1];
};

/**
 * Counts the number of appearances of a value in an array.
 *
 * @param array The array with the values.
 * @param value The value to search.
 *
 * @returns {number}
 */
export const countAppearances = (array, value) => {
    let counter = 0;

    array.forEach(arrayValue => {
        counter = arrayValue === value ? counter + 1 : counter;
    });

    return counter;
}

/**
 * Validates the phone number specified.
 *
 * @param phoneNumber The phone number to validate.
 *
 * @returns {boolean}
 */
export const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber.match('^[0-9]{9}$');
}