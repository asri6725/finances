
export function calculate_frequency(dates){
    var frequency = 0
    dates.map( (date, index) => {
        frequency += date.diff(dates[Math.min(index+1, dates.length-1)], 'days', true);
    })
    return (frequency/dates.length)
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
                'category':'food'
            });
        index += 1;
    }
    return result;
}

export function cummulative_amount_headings(){
    return [
        { field: 'id', headerName: 'ID',flex:1, },
        {
            field: 'description',
            headerName: 'Description',
            flex:1,
            minWidth:350,
          },
        {
          field: 'amount',
          headerName: 'Amount',
          type: 'number',flex:1,
        },
        {
            field: 'count',
            headerName: 'Count',
            type: 'number',flex:1,
          },
          {
            field: 'frequency',
            headerName: 'Frequency (days)',
            type: 'number',flex:1,
          },
          {
            field: 'category',
            headerName: 'Category (needs to be verified)',
            type: 'string',flex:1, editable:true
          }
      ];
}

export function display_cummulative_amount_bar(data){
    console.log(data);
    var result = []
    for(const[key, value] of Object.entries(data)){
        result.push({
                // 'date':results[i][headings.date],
                'text':value.category,
                'value':value.amount
            });
        }
    return result;
}