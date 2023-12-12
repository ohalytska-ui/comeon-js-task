import { Button } from 'semantic-ui-react';

export const UserProfile = ({ user, handleLogout }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="twelve wide column">
      <div className="ui list">
        <div className="player item">
          <img className="ui avatar image" src={user.avatar} alt="avatar" />
          <div className="content">
            <div className="header">
              <b className="name">{user.name}</b>
            </div>
            <div className="description event">{user.event}</div>
          </div>
        </div>
      </div>
      <Button className="logout ui left floated secondary button inverted" onClick={handleLogout}>
        <i className="left chevron icon"></i>Log Out
      </Button>
    </div>
  );
};
