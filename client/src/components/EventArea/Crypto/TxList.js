export default function TxList({ txs }) {
    if (txs.length === 0) return null;
  
    return (
      <>
        {txs.map((item) => (
          <div key={item} className="alert alert-info mt-5">
            <div className="flex-1">
              <p>Your transaction has been approved, visit <a href={`https://goerli.etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer">Etherscan</a> to see your transaction.</p>
            </div>
          </div>
        ))}
      </>
    );
  }
  