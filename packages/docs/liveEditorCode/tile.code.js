() => (
  <Tile
    illustration={
      <img
        src="https://transferwise.com/public-resources/assets/bank-details/bank-details-flow/finish.svg"
        alt="illustration"
      />
    }
    title="Send money"
    content={<p>Click here to be redirected to transferflow.</p>}
    onClick={() => alert('onClick')}
  />
);
