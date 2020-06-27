import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AutContext from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AutContext.Provider value={{ name: 'Carlos' }}>
        <SignIn />
      </AutContext.Provider>

      <GlobalStyle />
    </>
  );
};

export default App;
