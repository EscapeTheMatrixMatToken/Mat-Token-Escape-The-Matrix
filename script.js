const workerProxy = "https://workerjs.escapethematrixmattoken.workers.dev/?url=";
const quickSwapAPI = "https://api.thegraph.com/subgraphs/name/sameepsi/quickswap-v3";
const uniswapAPI = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

async function getPriceFromDEX(apiUrl) {
    try {
        const response = await fetch(workerProxy + encodeURIComponent(apiUrl), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: `{
                pools(first: 1) {
                    token0Price
                }
            }` })
        });

        const data = await response.json();

        if (!data || !data.data || !data.data.pools || data.data.pools.length === 0) {
            console.error("Λάθος δεδομένα από το API:", data);
            return "Μη διαθέσιμο";
        }

        return data.data.pools[0].token0Price;
    } catch (error) {
        console.error("Σφάλμα κατά την ανάκτηση της τιμής από το DEX:", error);
        return "Αποτυχία ανάκτησης";
    }
}

async function comparePrices() {
    document.getElementById("quickSwapPrice").innerText = "Τιμή QuickSwap: Φόρτωση...";
    document.getElementById("uniswapPrice").innerText = "Τιμή Uniswap: Φόρτωση...";

    const quickSwapPrice = await getPriceFromDEX(quickSwapAPI);
    const uniswapPrice = await getPriceFromDEX(uniswapAPI);

    document.getElementById("quickSwapPrice").innerText = `Τιμή QuickSwap: ${quickSwapPrice}`;
    document.getElementById("uniswapPrice").innerText = `Τιμή Uniswap: ${uniswapPrice}`;
}
