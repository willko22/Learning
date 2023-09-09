
function shuffle(dice: string, resultCount: any, resultElementID: string){
    const repeat = 10
    const delay = 70

    dice        = dice.includes(":")        ? (<HTMLInputElement> document.getElementById(dice.replace(/:/g, ""))).value        : dice;
    resultCount = resultCount.includes(":") ? (<HTMLInputElement> document.getElementById(resultCount.replace(/:/g, ""))).value : resultCount;

    
    for (let index = 0; index < repeat; index++) {
        setTimeout(function(){ 
            var result = "";
            for (let index = 0; index < resultCount; index++) {
                result = result + " " + rollDice(dice)
            };
            // getStats(dice, resultCount, resultElementID);
            (<HTMLElement> document.getElementById(resultElementID)).innerHTML = "You Rolled: " + result;    
        }, delay * index );
    }

    
}

function rollDice(dice: string) {

    const regEscape = v => v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    
    const diceFormula = { 
        count: 0,
        sides: 0,
        keep: "",
        keepCount: 0,
        operation: "",
        number: 0,
    };

    // *********** Get all values ***********
    let splitForKeep            = dice.split("k")
    let splitForDice            = splitForKeep[0].split(new RegExp(regEscape("d"), "ig"));
    let splitForOperations      = dice.replace(splitForKeep[0], "")


    var operation       : string       = ""
    var number          : number       = NaN
    var foundOperation  : string
    if (splitForOperations){
        foundOperation   = findOperation(splitForOperations)
        operation   = diceFormula.operation   = foundOperation
        const operationFilter = foundOperation ? splitForOperations.split(foundOperation)[1] : ""
        number      = diceFormula.number      = operationFilter ? parseInt(operationFilter.search(/\d+/)[0]) : 0
    }
    
    let count:      number       = diceFormula.count         = splitForDice[0] === null || splitForDice[0] === "0" ? 1 : parseInt(splitForDice[0])
    let sides:      number       = diceFormula.sides         = parseInt(splitForDice[1])
    let keep:       string       = diceFormula.keep          = splitForOperations.includes("l") ? "l" : splitForOperations.includes("h") ? "h" : ""
    let keepCount:  number       = diceFormula.keepCount     = splitForOperations ? splitForOperations.replace(String(number), "").search(/\d+/)[0] : 0

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
                let smallest: number = Math.min(...rolled)
                indexToRemove = rolled.indexOf(smallest)
                
            } else if (keep === "l"){
                let largest: number = Math.max(...rolled)
                indexToRemove = rolled.indexOf(largest)

            }

            rolled.splice(indexToRemove, 1)
        }
    }
  
    var calculated = 0 
    rolled.forEach( (v) => { calculated += v; } );
    calculated = operation === "-" ? calculated - number : operation === "+" ? calculated + number : calculated

    return calculated
}

function findOperation(string: string) {
    string = string ? string : ""
    const operations  = ["-", "+"];
    
    let ouput  = operations[operations.findIndex(v => string.includes(v))];
    
    return ouput
}
