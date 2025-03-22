const workerProxy = "https://workerjs.escapethematrixmattoken.workers.dev?url=";

async function getPriceFromDEX(apiUrl) {
    try {
        const response = await fetch(workerProxy + encodeURIComponent(apiUrl), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: `{
                pools(where: { id: "0x60594a405d53811d3bc4766596efd80fd545a270" }) {
                    token0Price
                }
            }` })
        });

        const data = await response.json();
        return data.data.pools[0].token0Price;
    } catch (error) {
        console.error("Σφάλμα κατά την ανάκτηση της τιμής από το DEX:", error);
        return null;
    }
}

async function comparePrices() {
    document.getElementById("quickSwapPrice").innerText = "Τιμή QuickSwap: Φόρτωση...";
    document.getElementById("uniswapPrice").innerText = "Τιμή Uniswap: Φόρτωση...";

    const quickSwapPrice = await getPriceFromDEX("https://api.thegraph.com/subgraphs/name/sameepsi/quickswap-v3");
    const uniswapPrice = await getPriceFromDEX("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3");

    document.getElementById("quickSwapPrice").innerText = quickSwapPrice 
        ? `Τιμή QuickSwap: ${quickSwapPrice}`
        : "Τιμή QuickSwap: Αποτυχία ανάκτησης";

    document.getElementById("uniswapPrice").innerText = uniswapPrice 
        ? `Τιμή Uniswap: ${uniswapPrice}`
        : "Τιμή Uniswap: Αποτυχία ανάκτησης";
}
