let timerContainer = document.getElementById('timer');

let endDate = '2033-12-11T12:34:56Z';
timerContainer.innerHTML = getDateDifference(endDate);

setInterval(() => {
    timerContainer.innerHTML = getDateDifference(endDate);
}, 1000);


function getDateDifference(endDate) {
    // Parse the dates
    let start = new Date();
    let end = new Date(endDate);

    // Swap dates if start is later than end
    if (start > end) {
        [start, end] = [end, start];
    }

    // Calculate total difference in seconds
    let totalSeconds = Math.floor((end - start) / 1000);

    // Calculate years difference
    let years = end.getUTCFullYear() - start.getUTCFullYear();
    const startYear = start.getUTCFullYear();
    const endYear = end.getUTCFullYear();
    let leapDays = 0;

    // Adjust for leap years in the range
    for (let year = startYear; year < endYear; year++) {
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            leapDays++;
        }
    }
    totalSeconds -= leapDays * 24 * 60 * 60;

    // Adjust total seconds for each year
    if (end < new Date(startYear + years, start.getUTCMonth(), start.getUTCDate())) {
        years--;
    }

    // Adjust start date by years to recalculate the remaining differences
    const adjustedStart = new Date(start);
    adjustedStart.setUTCFullYear(start.getUTCFullYear() + years);

    let diff = (end - adjustedStart) / 1000; // Remaining difference in seconds

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(diff / (24 * 60 * 60));
    diff -= days * 24 * 60 * 60;

    const hours = Math.floor(diff / (60 * 60));
    diff -= hours * 60 * 60;

    const minutes = Math.floor(diff / 60);
    const seconds = Math.floor(diff - minutes * 60);

    return `Anos: ${years}, dias: ${days}, horas: ${hours}, minutos: ${minutes}, segundos: ${seconds}`
}