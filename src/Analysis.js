export function calculate_frequency(dates){
    var frequency = 0
    dates.map( (date, index) => {
        frequency += date.diff(dates[Math.min(index+1, dates.length-1)], 'days', true);
        return 0;
    })
    return (frequency/dates.length).toFixed(0);
}

export function cummulative_amount(data){
    var result = {};
    data.map((data_point, index) => {
        if(data_point.amount < 0){
        if(!result[data_point.description]){
            result[data_point.description] = {"amount": data_point.amount, "date": [data_point.date]};

            }
        else{
            result[data_point.description].amount += data_point.amount;
            result[data_point.description].date.push(data_point.date);
        }}
        return 0;
    })
    return result;
}

export function display_cummulative_amount(data){
    var result = [];
    var index = 0;
    data = cummulative_amount(data);
    for(const[key, value] of Object.entries(data)){
        result.push({
                'id':index,
                // 'date':results[i][headings.date],
                'amount':value.amount,
                'description':key,
                'count':value.date.length,
                'frequency':calculate_frequency(value.date),
                'category': 'Other'
            });
        index += 1;
    }
    return result;
}

export function display_cummulative_amount_bar(cummulative_data_with_category){
    var result = []
    var graph = {}
    cummulative_data_with_category.forEach(element => {
        if(element.category){
            if(graph[element.category]){
                graph[element.category]+=element.amount;
            }
            else{
                graph[element.category] = element.amount;
            }
        }
    });
    for(const[key, value] of Object.entries(graph)){
        result.push({
                // 'date':results[i][headings.date],
                'text':key,
                'value':Math.abs(value).toFixed(2)
            });
        }
    return result;
}