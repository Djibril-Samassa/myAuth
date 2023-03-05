import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useState, useEffect } from 'react';
import { supabase } from './client';
import axios, { Axios } from 'axios';

function App() {

  const [user, setUser] = useState(null)
  const [repoCount, setRepoCount] = useState()
  const [link, setLink] = useState()
  useEffect(() => {
    window.addEventListener('hashchange', function () {
      checkUser();
    })
  }, [])

  useEffect(() => {
    count()
  }, [user])

  const count = async () => {
    const response = await fetch(`https://api.github.com/users/${user.user_name}/repos`)
    const data = await response.json()
    setRepoCount(data)
    setLink(`https://github.com/${user.user_name}?tab=repositories`)
    console.log(data)
  }

  async function checkUser() {
    supabase.auth.getUser()
      .then((res) => { setUser(res.data.user.user_metadata) })
      .catch((err) => { console.log(err) })
  }

  async function githubSign() {
    await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
  }

  async function signOut() {
    await supabase.auth.signOut;
    setUser(null)
  }





  return (
    <div className="App">
      <header className="App-header">

        {user ?<>
          <div className='data'>
            <img className='profpic' src={user.avatar_url} />
            <h3>Bienvenue {user.name} vous êtes connecté avec votre compte Github</h3>
            <p>Adresse e-mail: {user.email}</p>
            <p>Nombre de repositories public sur Github : {repoCount?.length}  </p>
            <span className='repolist'>{repoCount?.slice(0, 10).map((repo) => {
              return <li>{repo.name} /</li>
            })}...et plus</span>
          </div>
            <a className='link' href={link} target="_blank">Voir plus</a></>
          : null}
        {user === null ? <button onClick={() => { githubSign() }}>Se connecter avec Github</button> : <button onClick={() => { signOut() }}>Se déconnecter</button>}
        {/* {user === undefined ?
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              const decoded = jwt_decode(credentialResponse.credential)
              setUser(decoded)
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          /> :
          <div>
            <h3>Bonjour {user.name}</h3>
            <img src={user.picture} />
            <p>Vous êtes connecté avec le compte: <br /> {user.email}</p>
            <button onClick={() => { setUser() }}>Se deconnecter</button>
          </div>
        } */}
      </header>
    </div>
  );
}

export default App;
