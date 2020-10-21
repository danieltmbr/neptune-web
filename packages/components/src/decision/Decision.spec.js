import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Decision from '.';
import Avatar from '../avatar';

const props = {
  type: 'NAVIGATION',
  presentation: Decision.Presentation.LIST_BLOCK,
  options: [
    {
      media: {
        list: (
          <Avatar>
            <img src="image.jpg" alt="alt" />
          </Avatar>
        ),
        block: (
          <Avatar>
            <img src="image.jpg" alt="alt" />
          </Avatar>
        ),
      },
      title: 'title',
      content: 'content',
      onClick: jest.fn(),
    },
  ],
};
describe('Decision', () => {
  describe(`when presentation is ${Decision.Presentation.LIST_BLOCK}`, () => {
    it('renders as expected', () => {
      const { container } = render(<Decision {...props} />);
      expect(container).toMatchSnapshot();
    });
    it('when user clicks on navigation or tike it fires click event ', () => {
      const { getAllByText } = render(<Decision {...props} />);
      const firstOption = props.options[0];
      userEvent.click(getAllByText(firstOption.title)[0]);
      expect(firstOption.onClick).toHaveBeenCalledTimes(1);
      userEvent.click(getAllByText(firstOption.title)[1]);
      expect(firstOption.onClick).toHaveBeenCalledTimes(2);
    });
  });

  describe(`when presentation is ${Decision.Presentation.LIST_BLOCK_SMALL}`, () => {
    it('renders as expected', () => {
      const { container } = render(
        <Decision {...props} presentation={Decision.Presentation.LIST_BLOCK_SMALL} />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe(`when presentation is ${Decision.Presentation.LIST}`, () => {
    it('renders as expected', () => {
      const { container } = render(
        <Decision {...props} presentation={Decision.Presentation.LIST} />,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
