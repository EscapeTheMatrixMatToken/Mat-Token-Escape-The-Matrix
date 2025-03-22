const proxies = [
    "https://corsproxy.io/?",
    "https://api.allorigins.win/raw?url=",
    "https://thingproxy.freeboard.io/fetch/"
];

async function fetchWithProxy(url, query) {
    for (let proxy of proxies) {
        try {
            let response = await fetch(proxy + encodeURIComponent(url), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {
            console.error("Αποτυχία proxy:", proxy, e);
        }
    }
    throw new Error("Όλοι οι proxies απέτυχαν");
}

async function getQuickSwapPrice() {
    console.log("Λήψη τιμής από QuickSwap...");
    const url = "https://api.thegraph.com/subgraphs/name/sameepsi/quickswap";
    const query = `{ bundle(id: "1") { ethPrice } }`;
    let data = await fetchWithProxy(url, query);
    return data?.data?.bundle?.ethPrice || "Σφάλμα";
}

async function getUniswapPrice() {
    console.log("Λήψη τιμής από Uniswap...");
    const url = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";
    const query = `{ bundle(id: "1") { ethPrice } }`;
    let data = await fetchWithProxy(url, query);
    return data?.data?.bundle?.ethPrice || "Σφάλμα";
}

async function comparePrices() {
    document.getElementById("output").innerHTML = "Λήψη τιμών...";

    let quickswap = await getQuickSwapPrice();
    let uniswap = await getUniswapPrice();

    document.getElementById("output").innerHTML = `
        <strong>Τιμή QuickSwap:</strong> ${quickswap} USDC<br>
        <strong>Τιμή Uniswap:</strong> ${uniswap} USDC
    `;
}

document.getElementById("fetchPrices").addEventListener("click", comparePrices);
