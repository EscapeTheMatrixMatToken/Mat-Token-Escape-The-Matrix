const workerProxy = "https://workerjs.escapethematrixmattoken.workers.dev?url=";

async function getPriceFromDEX(apiUrl) {
    try {
        let response = await fetch(workerProxy + encodeURIComponent(apiUrl));
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching DEX price:", error);
        return null;
    }
}

async function comparePrices() {
    document.getElementById("quickSwapPrice").innerText = "QuickSwap Price: Loading...";
    document.getElementById("uniswapPrice").innerText = "Uniswap Price: Loading...";

    let quickSwapData = await getPriceFromDEX("https://api.thegraph.com/subgraphs/name/sameepsi/quickswap");
    let uniswapData = await getPriceFromDEX("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3");

    document.getElementById("quickSwapPrice").innerText = quickSwapData 
        ? `QuickSwap Price: ${JSON.stringify(quickSwapData)}`
        : "QuickSwap Price: Failed to fetch";

    document.getElementById("uniswapPrice").innerText = uniswapData 
        ? `Uniswap Price: ${JSON.stringify(uniswapData)}`
        : "Uniswap Price: Failed to fetch";
}

