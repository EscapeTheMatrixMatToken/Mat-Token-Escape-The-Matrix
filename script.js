const workerProxy = "https://workerjs.escapethematrixmattoken.workers.dev?url=";

async function getPriceFromDEX(apiUrl) {
    try {
        let response = await fetch(workerProxy + encodeURIComponent(apiUrl), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: `{ bundle(id: "1") { ethPrice } }` })
        });

        let data = await response.json();
        return data.data.bundle.ethPrice; // Παίρνουμε την τιμή ETH
    } catch (error) {
        console.error("Error fetching DEX price:", error);
        return null;
    }
}

async function comparePrices() {
    document.getElementById("quickSwapPrice").innerText = "QuickSwap Price: Loading...";
    document.getElementById("uniswapPrice").innerText = "Uniswap Price: Loading...";

    let quickSwapPrice = await getPriceFromDEX("https://api.thegraph.com/subgraphs/name/sameepsi/quickswap");
    let uniswapPrice = await getPriceFromDEX("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3");

    document.getElementById("quickSwapPrice").innerText = quickSwapPrice 
        ? `QuickSwap Price: ${quickSwapPrice}`
        : "QuickSwap Price: Failed to fetch";

    document.getElementById("uniswapPrice").innerText = uniswapPrice 
        ? `Uniswap Price: ${uniswapPrice}`
        : "Uniswap Price: Failed to fetch";
}
