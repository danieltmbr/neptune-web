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
    content={<p>Click here to be redirected to transferflow.</p>}
    onClick={() => alert('onClick')}
  />
);
