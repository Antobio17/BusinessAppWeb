/**
 * Returns the date in spanish format.
 *
 * @param date Date to format.
 *
 * @returns {`${string}, ${number} de ${string} de ${number}`}
 */
export const formatDate = (date) => {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
            "Octubre", "Noviembre", "Diciembre"]

    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

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
    const incrementHours = Math.floor(minutsIncrement) / 60;
    const incrementsMinuts = minutsIncrement % 60;

    let minuts = parseInt(splitHour[1]) + incrementsMinuts;
    let restHour = minuts / 60;
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