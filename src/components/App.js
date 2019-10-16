import React from 'react';
import './App.css';
import NationCheckbox from './NationCheckbox.js';
import GenderSelect from './GenderSelect.js';
import SingleUser from './SingleUser.js';

const API = 'https://randomuser.me/api/?results=1';
class App extends React.Component {
  state = {
    api: API,
    gender: '',
    nation: [
      {name: 'Australia', code: 'au', checked: false},
      {name: 'Brazylia', code: 'br', checked: false},
      {name: 'Kanada', code: 'ca', checked: false},
      {name: 'Szwajcaria', code: 'ch', checked: false},
      {name: 'Niemcy', code: 'de', checked: false},
      {name: 'Dania', code: 'dk', checked: false},
      {name: 'Hiszpania', code: 'es', checked: false},
      {name: 'Finlandia', code: 'fi', checked: false},
      {name: 'Francja', code: 'fr', checked: false},
      {name: 'Wielka Brytania', code: 'gb', checked: false},
      {name: 'Irlandia', code: 'ie', checked: false},
      {name: 'Iran', code: 'ir', checked: false},
      {name: 'Norwegia', code: 'no', checked: false},
      {name: 'Holandia', code: 'nl', checked: false},
      {name: 'Nowa Zelandia', code: 'nz', checked: false},
      {name: 'Turcja', code: 'tr', checked: false},
      {name: 'Stany Zjednoczone', code: 'us', checked: false}
    ],
    user: [],
    users: []
  };
  addCountry = () => {
    let nation = this.state.nation;
    let filtered = [];
    nation.forEach(nat => {
      if(nat.checked) {
        filtered.push(nat.code);
      }
    });
    return filtered
  };
  makeURL = () => {
    let nationURL, genderURL;
    let genders = this.state.gender;
    if(genders) {
      genderURL = '&gender=' + genders;
    } else {
      genderURL = '';
    }

    let nations = this.addCountry().toString();
    if(nations.length) {
      nationURL = '&nat=' + nations;
    } else {
      nationURL = '';
    }
    let api = API + genderURL + nationURL;
    this.setState({api});
  };
  genderChoose = (e) => {
    this.setState({gender: e.target.value}, () => this.makeURL(this.state));
  };
  countryChoose = (e) => {
    let nation = this.state.nation;
    nation.forEach(nat => {
      if(nat.code === e.target.title) {
        nat.checked = e.target.checked;
      }
    });
    this.setState({nation}, () => this.makeURL(this.state));
  };
  fetchUser = () => {
    let prevUsers = this.state.users;
    fetch(this.state.api)
        .then(response => response.json())
        .then(data => {
          let user = data.results;
          this.setState({user}, () => {
            let users = prevUsers.concat(user);
            this.setState({users});
          })
        })
        .catch(error => console.error('Error:', error));
  };
  render() {
    const nations = this.state.nation.map((nat) => {
      return (
          <NationCheckbox key={nat.code} code={nat.code} name={nat.name} checked={nat.checked} change={this.countryChoose}/>
      )
    });
    let nationality;
    const users = this.state.users.map(user => {
      this.state.nation.forEach(el => {
        if(el.code === user.nat.toLowerCase()) {
          nationality = el.name;
        }
      });
      return (
          <SingleUser key={user.login.uuid} nat={nationality} first={user.name.first} last={user.name.last} age={user.dob.age} picture={user.picture.medium}/>
      )
    });
    return (
        <div className="container">
          <div className="container_conditions">
            <h4 className="main_header">Pobieranie danych użytkowników z API <span>(<a href="https://randomuser.me">https://randomuser.me</a>)</span></h4>
            <div className="conditions_gender">
              <h4>Jakiej płci ma być użytkownik?</h4>
              <div className="gender_select_wrapper">
                <GenderSelect value={this.state.gender} change={this.genderChoose}/>
              </div>
            </div>
            <div className="conditions_nation">
              <h4>Jakiej narodowości ma być użytkownik? <span>(jeśli nic nie zostanie zaznaczone, narodowość będzie losowa)</span></h4>
              {nations}
            </div>
          </div>
          <div className="container_users">
            <button onClick={this.fetchUser}>Pobierz użytkownika</button>
            <ul>
              {this.state.users.length ? users : ''}
            </ul>
          </div>
        </div>
    )
  }
}

export default App;