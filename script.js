const workerProxy = "https://workerjs.escapethematrixmattoken.workers.dev?url=";

async function getPriceFromDEX(apiUrl) {
    try {
        let response = await fetch(workerProxy + encodeURIComponent(apiUrl), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: `{
                pools(where: { id: "0x60594a405d53811d3bc4766596efd80fd545a270" }) {
                    token0Price
                }
            }` })
        });

        let data = await response.json();
        return data.data.pools[0].token0Price;
    } catch (error) {
        console.error("Error fetching DEX price:", error);
        return null;
    }
}

async function comparePrices() {
    document.getElementById("quickSwapPrice").innerText = "QuickSwap Price: Loading...";
    document.getElementById("uniswapPrice").innerText = "Uniswap Price: Loading...";

    let quickSwapPrice = await getPriceFromDEX("https://api.thegraph.com/subgraphs/name/sameepsi/quickswap-v3");
    let uniswapPrice = await getPriceFromDEX("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3");

    document.getElementById("quickSwapPrice").innerText = quickSwapPrice 
        ? `QuickSwap Price: ${quickSwapPrice}`
        : "QuickSwap Price: Failed to fetch";

    document.getElementById("uniswapPrice").innerText = uniswapPrice 
        ? `Uniswap Price: ${uniswapPrice}`
        : "Uniswap Price: Failed to fetch";
}
