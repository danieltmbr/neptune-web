() => (
  <Decision
    options={[
      {
        media: {
          list: (
            <Avatar size="md" theme="light" type="initials" className="text-xs-center">
              HM
            </Avatar>
          ),
          block: (
            <img src="https://transferwise.com/public-resources/assets/bank-details/bank-details-flow/finish.svg" />
          ),
        },
        title: 'Hank Miller',
        content: (
          <p>
            Click here to send money to Hank Miller. Money will be sent directly to Hank Miller's
            multi-currency account.
          </p>
        ),
        onClick: console.log('clicked'),
      },
    ]}
    type={Decision.Type.NAVIGATION}
    presentation={Decision.Presentation.LIST_BLOCK}
  />
);
