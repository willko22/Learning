function shuffle(dice, resultCount, resultElementID) {
    var repeat = 10;
    var delay = 70;
    console.log(dice);
    dice = dice.includes(':') ? document.getElementById(dice.replace(/:/g, "")).value : dice;
    resultCount = resultCount.includes(":") ? document.getElementById(resultCount.replace(/:/g, "")).value : resultCount;
    for (var index = 0; index < repeat; index++) {
        setTimeout(function () {
            var result = "";
            for (var index_1 = 0; index_1 < resultCount; index_1++) {
                result = result + " " + rollDice(dice);
            }
            ;
            // getStats(dice, resultCount, resultElementID);
            document.getElementById(resultElementID).innerHTML = "You Rolled: " + result;
        }, delay * index);
    }
}
function rollDice(dice) {
    dice.toLowerCase();
    // *********** Get all values ***********
    var splitForKeep = dice.split("k");
    var splitForDice = splitForKeep[0].split(new RegExp("d", "ig"));
    var splitForOperations = dice.replace(splitForKeep[0], "");
    var operation = "";
    var number = NaN;
    var foundOperation;
    if (splitForOperations) {
        foundOperation = findOperation(splitForOperations);
        operation = foundOperation;
        var operationFilter = foundOperation ? splitForOperations.split(foundOperation)[1] : "";
        number = operationFilter ? parseInt(operationFilter.search(/\d+/)[0]) : 0;
    }
    var count = splitForDice[0] === null || splitForDice[0] === "0" ? 1 : parseInt(splitForDice[0]);
    var sides = parseInt(splitForDice[1]);
    var keep = splitForOperations.search("l") ? "l" : splitForOperations.search("h") ? "h" : "";
    var keepCount = splitForOperations ? splitForOperations.replace(String(number), "").search(/\d+/)[0] : 0;
    // 6d20.max3
    // *********** Process values ***********
    var rolled = [];
    for (var i = 0; i < count; i++) {
        rolled.push(Math.floor(Math.random() * sides) + 1);
    }
    if (keep) {
        var indexToRemove = NaN;
        for (var index = 0; index = (rolled.length - keepCount); index++) {
            if (keep === "h") {
                indexToRemove = rolled.indexOf(Math.min.apply(Math, rolled));
            }
            else if (keep === "l") {
                indexToRemove = rolled.indexOf(Math.max.apply(Math, rolled));
            }
            rolled.splice(indexToRemove, 1);
        }
    }
    var calculated = 0;
    rolled.forEach(function (v) { calculated += v; });
    calculated = operation === "-" ? calculated - number : operation === "+" ? calculated + number : calculated;
    return calculated;
}
function findOperation(input) {
    input = input ? input : "";
    var operations = ["-", "+"];
    var output = operations[operations.findIndex(function (v) { return input.search(v); })];
    return output;
}
