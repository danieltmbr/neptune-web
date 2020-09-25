() => (
  <Picker
    size={Picker.Size.LARGE}
    items={[
      {
        media: (
          <img
            src="https://transferwise.com/public-resources/assets/bank-details/bank-details-flow/finish.svg"
            alt="illustration"
            style={{ width: '100%' }}
          />
        ),
        smallMedia: (
          <img
            src="https://transferwise.com/public-resources/assets/balances/open-balance/balance_type_everyday_small.svg"
            alt="illustration"
            style={{ width: '100%' }}
          />
        ),
        title: 'Send money',
        content: 'Click here to be redirected to transferflow',
      },
      {
        media: (
          <Avatar size="md" theme="light" type="initials" className="text-xs-center">
            HM
          </Avatar>
        ),
        title: 'Hank Miller',
        content: (
          <span>
            Click here to send money to Hank Miller. Money will be sent directly to Hank Miller's
            multi-currency account.
          </span>
        ),
      },
    ]}
  />
);
