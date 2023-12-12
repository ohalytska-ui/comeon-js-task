import { Message, Icon } from 'semantic-ui-react';

export const Notification = ({ error }) => {
  return error ? (
    <Message attached="bottom" error>
      <Icon name="exclamation" />
      {error}
    </Message>
  ) : null;
};
