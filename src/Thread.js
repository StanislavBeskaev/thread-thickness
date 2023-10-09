const Thread = ({amount, thickness, setThread}) => {
  const setAmount = newAmount => {
    setThread({amount: newAmount, thickness})
  }

  const setThickness = newThickness => {
    setThread({amount, thickness: newThickness})
  }

  return <>
    <div className="thread-container">
      <input
        type="number"
        value={amount}
        min={1}
        onChange={e => setAmount(e.target.value)}
        className="thread-input thread-amount"
      />
      <span> X </span>
      <input
        type="number"
        value={thickness}
        min={1}
        onChange={e => setThickness(e.target.value)}
        className="thread-input thread-thickness"/>
    </div>
  </>
}


export default Thread
