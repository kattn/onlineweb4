import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import ProfileSmall from './ProfileSmall';

class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: props.query,
      users: [
        { name: 'Ole Anders Stokker', phone: '47684466', mail: 'oleast@stud.ntnu.no', image: 'https://folk.ntnu.no/oleast/me.jpg' },
        { name: 'Ole Anders Stokker', phone: '47684466', mail: 'oleast@stud.ntnu.no', image: 'https://folk.ntnu.no/oleast/me.jpg' },
        { name: 'Ole Anders Stokker', phone: '47684466', mail: 'oleast@stud.ntnu.no', image: 'https://folk.ntnu.no/oleast/me.jpg' },
        { name: 'Ole Anders Stokker', phone: '47684466', mail: 'oleast@stud.ntnu.no', image: 'https://folk.ntnu.no/oleast/me.jpg' },
      ]
    };
  }

  componentWillMount() {
    
  }

  render() {
    const { users } = this.state;
    return (
      <Grid>
        <div className="profile-search">
          { users.map(user => 
            <ProfileSmall user={user} />)
          }
        </div>
      </Grid>
    );
  }
}
  
export default Search;
  