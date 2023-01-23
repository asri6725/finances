export function calculate_frequency(data){
    var arr = []
    data.map( (data_point) => {
        arr.push(data_point.date);
    })
}

export function cumulative_amount(data){
    result = {}
    data.map((data_point) => {
        if(!result[data_point.description]){
            result[data_point.description] = data_point.amount;
            }
        else{
            result[data_point.description] += data_point.amount;
        }
    })
}