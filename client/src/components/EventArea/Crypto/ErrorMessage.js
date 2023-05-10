export default function ErrorMessage({ message }) {
  if (!message) return null;
  if (message) {
    if (message.substring(0, 25) == "user rejected transaction") {
      message = "Transaction rejected !"
    }
    else if (message.substring(0, 24) == "Internal JSON-RPC error.") {
      message = "Transaction rejected !";
    }
    else if (message.substring(0, 18) == "insufficient funds") {
      message = "Insufficient funds to insure transaction!";
    }
    else {
      message = "Error pressist!"
    }
  }

  return (
    <div className="alert alert-danger mt-5">
      <div className="flex-1">
        <label>{message}</label>
      </div>
    </div>
  );
}
