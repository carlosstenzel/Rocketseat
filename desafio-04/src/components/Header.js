import React from "react";

function Header() {
  return (
    <header>
      <nav>
        <img src="https://i.imgur.com/KDIDiSE.png" />
        <div className="account">
          <span>Meu Perfil</span>
          <img className="avatar" src='https://avatars3.githubusercontent.com/u/3890516?s=460&v=4'/>
        </div>
      </nav>
    </header>
  );
}

export default Header;
