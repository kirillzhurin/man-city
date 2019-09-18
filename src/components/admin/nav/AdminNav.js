import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../../firebase';

const AdminNav = () => {
  const links = [
    {
      title: 'Matches',
      to: '/admin/matches'
    },
    {
      title: 'Add Match',
      to: '/admin/edit/match'
    },
    {
      title: 'Players',
      to: '/admin/players'
    },
    {
      title: 'Add Player',
      to: '/admin/add/player'
    }
  ];

  const style = {
    color: '#fff',
    fontWeight: '300',
    borderBottom: '1px solid #353535'
  }

  const renderIrems = () => (
    links.map(link => (
      <Link to={link.to} key={link.title}>
        <ListItem button style={style}>
          {link.title}
        </ListItem>
      </Link>
    ))
  )

  const logoutHandler =  async () => {
    try {
      await firebase.auth().signOut();
      console.log('sign out successfull');
    } catch (error) {
      console.log('Error logging out');
    }
  }

  return (
    <div>
      {renderIrems()}
      <ListItem button style={style} onClick={logoutHandler}>
        Log out
      </ListItem>
    </div>
  );
};

export default AdminNav;