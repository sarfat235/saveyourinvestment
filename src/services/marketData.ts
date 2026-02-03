export async function fetchQuote(symbol: string) {
    const res = await fetch("/yahoo/v7/finance/quote?symbols=" + symbol);

    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    return data?.quoteResponse?.result?.[0];
}

