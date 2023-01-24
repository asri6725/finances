export function calculate_frequency(data){
    var arr = []
    data.map( (data_point) => {
        arr.push(data_point.date);
    })
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
                'description':key
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
        }
      ];
}