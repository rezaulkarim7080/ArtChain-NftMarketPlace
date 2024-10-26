export const getTopCreators = (creators) => {
  const finalCreators = [];

  // Group NFTs by seller
  const finalResults = creators.reduce((index, currentValue) => {
    // Initialize the array if not already done
    if (!index[currentValue.seller]) {
      index[currentValue.seller] = [];
    }

    // Add the current NFT to the seller's list
    index[currentValue.seller].push(currentValue);

    return index;
  }, {});

  // Calculate total sales per seller
  Object.entries(finalResults).forEach(([seller, sellerNFTs]) => {
    const total = sellerNFTs
      .map((nft) => Number(nft.price))
      .reduce((prev, curr) => prev + curr, 0);

    finalCreators.push({ seller, total });
  });

  // Sort creators by total sales (highest to lowest)
  finalCreators.sort((a, b) => b.total - a.total);

  return finalCreators;
};
