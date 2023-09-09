
function shuffle(dice: string, resultCount: any, resultElementID: string){
    const repeat = 10
    const delay = 70

    console.log(dice);
    
    dice        = dice.includes(':')        ? (<HTMLInputElement> document.getElementById(dice.replace(/:/g, ""))).value        : dice;
    resultCount = resultCount.includes(":") ? (<HTMLInputElement> document.getElementById(resultCount.replace(/:/g, ""))).value : resultCount;

    
    for (let index = 0; index < repeat; index++) {
        setTimeout(function(){ 
            var result = "";
            for (let index = 0; index < resultCount; index++) {
                result = result + " " + rollDice(dice)
            };
            // getStats(dice, resultCount, resultElementID);
            document.getElementById(resultElementID).innerHTML = "You Rolled: " + result;    
        }, delay * index );
    }

    
}

function rollDice(dice: string) {

    dice.toLowerCase()
    
    // *********** Get all values ***********
    let splitForKeep            = dice.split("k")
    let splitForDice            = splitForKeep[0].split(new RegExp("d", "ig"));
    let splitForOperations      = dice.replace(splitForKeep[0], "")


    var operation       : string       = ""
    var number          : number       = NaN
    var foundOperation  : string
    if (splitForOperations){
        foundOperation   = findOperation(splitForOperations)
        operation   = foundOperation
        const operationFilter = foundOperation ? splitForOperations.split(foundOperation)[1] : ""
        number      = operationFilter ? parseInt(operationFilter.search(/\d+/)[0]) : 0
    }
    
    let count:      number       = splitForDice[0] === null || splitForDice[0] === "0" ? 1 : parseInt(splitForDice[0])
    let sides:      number       = parseInt(splitForDice[1])
    let keep:       string       = splitForOperations.search("l") ? "l" : splitForOperations.search("h") ? "h" : ""
    let keepCount:  number       = splitForOperations ? splitForOperations.replace(String(number), "").search(/\d+/)[0] : 0

    // 6d20.max3
    // *********** Process values ***********

    var rolled: number[] = []
    for (let i = 0; i < count; i++) {
        rolled.push(Math.floor(Math.random() * sides) + 1)
    }
    
    if (keep){
        let indexToRemove: number = NaN
        for (let index = 0; index = (rolled.length - keepCount) ; index++) {
            if (keep === "h"){
                indexToRemove = rolled.indexOf(Math.min(...rolled))
            } else if (keep === "l"){
                indexToRemove = rolled.indexOf(Math.max(...rolled))
            }

            rolled.splice(indexToRemove, 1)
        }
    }
  
    var calculated = 0 
    rolled.forEach( (v) => { calculated += v; } );
    calculated = operation === "-" ? calculated - number : operation === "+" ? calculated + number : calculated

    return calculated
}

function findOperation(input: string) {
    input = input ? input : ""
    const operations  = ["-", "+"];
    
    let output  = operations[operations.findIndex(v => input.search(v))];
    
    return output
}
