() => (
  <Tile
    media={
      <img
        src="https://transferwise.com/public-resources/assets/bank-details/bank-details-flow/finish.svg"
        alt="illustration"
        style={{ width: '100%' }}
      />
    }
    size={Tile.Size.LARGE}
    title="Send money"
    content="Click here to be redirected to transferflow."
    onClick={() => alert('onClick')}
  />
);