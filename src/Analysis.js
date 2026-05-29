export function calculateFrequency(dates) {
    let frequency = 0;
    dates.forEach((date, index) => {
        frequency += date.diff(dates[Math.min(index + 1, dates.length - 1)], 'days', true);
    });
    return (frequency / dates.length).toFixed(0);
}

export function cumulativeAmount(data) {
    const result = {};
    data.forEach((dataPoint) => {
        if (dataPoint.amount < 0) {
            if (!result[dataPoint.description]) {
                result[dataPoint.description] = { amount: dataPoint.amount, date: [dataPoint.date] };
            } else {
                result[dataPoint.description].amount += dataPoint.amount;
                result[dataPoint.description].date.push(dataPoint.date);
            }
        }
    });
    return result;
}

export function displayCumulativeAmount(data) {
    const result = [];
    let index = 0;
    const processedData = cumulativeAmount(data);
    for (const [key, value] of Object.entries(processedData)) {
        result.push({
            id: index,
            amount: value.amount,
            description: key,
            count: value.date.length,
            frequency: calculateFrequency(value.date),
            category: 'Other'
        });
        index += 1;
    }
    return result;
}

export function displayCumulativeAmountBar(cumulativeDataWithCategory) {
    const result = [];
    const graph = {};
    cumulativeDataWithCategory.forEach(element => {
        if (element.category) {
            graph[element.category] = (graph[element.category] || 0) + element.amount;
        }
    });
    for (const [key, value] of Object.entries(graph)) {
        result.push({
            text: key,
            value: Math.abs(value).toFixed(2)
        });
    }
    return result;
}