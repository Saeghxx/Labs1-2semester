//Generator
function* roundRobinGenerator(items) {
    while (true) {
        for (const item of items) {
            yield item;
        }
    }
}

module.exports = { roundRobinGenerator };