
// function shuffle(dice, resultCount, resultElementID){
//     const repeat = 10
//     const delay = 70

//     dice        = dice.includes(":")        ? document.getElementById(dice.replace(/:/g, "")).value         : dice;
//     resultCount = resultCount.includes(":") ? document.getElementById(resultCount.replace(/:/g, "")).value  : resultCount;

    
//     for (let index = 0; index < repeat; index++) {
//         setTimeout(function(){ 
//             var result = "";
//             for (let index = 0; index < resultCount; index++) {
//                 result = result + " " + rollDice(dice)
//             };
//             // getStats(dice, resultCount, resultElementID);
//             document.getElementById(resultElementID).innerHTML = "You Rolled: " + result;    
//         }, delay * index );
//     }

    
// }

// function rollDice(dice) {

//     const regEscape = v => v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    
//     const diceFormula = { 
//         count: "",
//         sides: "",
//         keep: "",
//         keepCount: "",
//         operation: "",
//         number: "",
//     };

//     // *********** Get all values ***********
//     let splitForKeep            = dice.split("k")
//     let splitForDice            = splitForKeep[0].split(new RegExp(regEscape("d"), "ig"));
//     let splitForOperations      = dice.replace(splitForKeep[0], "")


//     var operation   = ""
//     var number      = ""
//     var foundOperation = ""
//     if (splitForOperations){
//         foundOperation   = findOperation(splitForOperations)
//         operation   = diceFormula.operation   = foundOperation
//         const operationFilter = foundOperation ? splitForOperations.split(foundOperation)[1] : ""
//         number      = diceFormula.number      = operationFilter ? parseInt(operationFilter.match(/\d+/)[0]) : ""
//     }
    
//     count           = diceFormula.count         = parseInt(splitForDice[0] === "" || splitForDice[0] === "0" ? 1 : splitForDice[0])
//     sides           = diceFormula.sides         = parseInt(splitForDice[1])
//     keep            = diceFormula.keep          = splitForOperations.includes("l") ? "l" : splitForOperations.includes("h") ? "h" : ""
//     keepCount       = diceFormula.keepCount     = splitForOperations ? splitForOperations.replace(number, "").match(/\d+/)[0] : 0

//     // 6d20.max3
//     // *********** Process values ***********

//     var rolled = []
//     for (let i = 0; i < count; i++) {
//         rolled.push(Math.floor(Math.random() * sides) + 1)
//     }
    
//     if (keep){
//         var indexToRemove = ""
//         for (let index = 0; index = (rolled.length - keepCount) ; index++) {
//             if (keep === "h"){
//                 let smallest = Math.min(...rolled)
//                 indexToRemove = rolled.indexOf(smallest)
                
//             } else if (keep === "l"){
//                 let largest = Math.max(...rolled)
//                 indexToRemove = rolled.indexOf(largest)

//             }

//             rolled.splice(indexToRemove, 1)
//         }
//     }
  
//     var calculated = 0 
//     rolled.forEach( (v) => { calculated += v; } );
//     calculated = operation === "-" ? calculated - number : operation === "+" ? calculated + number : calculated

//     return calculated
// }


// function findOperation(string) {
//     string = string ? string : ""
//     const operations  = ["-", "+"];
    
//     let ouput  = operations[operations.findIndex(v => string.includes(v))];
    
//     return ouput
// }