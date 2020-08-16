() => (
  <Picker
    items={[
      {
        media: (
          <img
            src="https://transferwise.com/public-resources/assets/bank-details/bank-details-flow/finish.svg"
            alt="illustration"
            style={{ width: '100%' }}
          />
        ),
        title: 'Send money',
        content: <p>Click here to be redirected to transferflow.</p>,
      },
      {
        media: (
          <Avatar size="md" theme="light" type="initials" className="text-xs-center">
            HM
          </Avatar>
        ),
        title: 'Hank Miller',
        content: (
          <p>
            Click here to send money to Hank Miller. Money will be sent directly to Hank Miller's
            multi-currency account.
          </p>
        ),
      },
    ]}
  />
);
