import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Form, Input, SubmitButton} from './styles';

export default class Main extends React.Component {
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = () => {
    console.log(this.state.newUser);
  };

  render() {
    const {users, newUser} = this.state;
    return (
      <>
        <Container>
          <Form>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Adicionar usuários"
              value={newUser}
              onChangeText={text => this.setState({newUser: text})}
              returnKeyType="send"
            />
            <SubmitButton onPress={this.handleAddUser}>
              <Icon name="add" size={20} color="#FFF" />
            </SubmitButton>
          </Form>
        </Container>
      </>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuários',
};
