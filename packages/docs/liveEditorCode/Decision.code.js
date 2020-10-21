() => (
  <Decision
    type="NAVIGATION"
    presentation={Decision.Presentation.LIST_BLOCK}
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
        title: 'Cat jumps and falls',
        content:
          'Cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter',
        onClick: console.log('clicked'),
      },
    ]}
  />
);
