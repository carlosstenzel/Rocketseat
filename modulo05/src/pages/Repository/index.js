import React from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default class Repository extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        state: 'Open',
        per_page: 5,
      }),
    ]);

    this.setState({
      repostitory: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {


    return <h1>Repository: </h1>;
  }
}
