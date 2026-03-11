async function iterateWithTimeout(iterator, timeoutSeconds) {
    const startTime = Date.now();

    for (const value of iterator) {
        const elapsed = Date.now() - startTime; 
if (elapsed >= timeoutSeconds * 1000) break;

        console.log(`Value: ${value}`); 

        await new Promise(res => setTimeout(res, 500));
    }

    console.log("Timeout reached. Iteration stopped.");
}

module.exports = { iterateWithTimeout };