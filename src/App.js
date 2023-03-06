import './App.css';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { supabase } from './client';

function App() {

  const [user, setUser] = useState(null)
  const [providerName, setProviderName] = useState('')
  const [repoCount, setRepoCount] = useState()
  const [link, setLink] = useState()

  useEffect(() => {
    window.addEventListener('hashchange', function () {
      checkUser();
    })
  }, [])

  useEffect(() => {
    count()
  }, [providerName === "https://api.github.com"])

  const count = async () => {
    const response = await fetch(`https://api.github.com/users/${user?.user_name}/repos`)
    const data = await response.json()
    await setRepoCount(data)
    await setLink(`https://github.com/${user?.user_name}?tab=repositories`)
  }


  async function checkUser() {
    await supabase.auth.getUser()
      .then(async (res) => {
        setProviderName(res.data.user.user_metadata.iss)
        await setUser(res.data.user.user_metadata)
      })
      .catch((err) => { console.log(err) })
  }

  async function githubSign() {
    await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    setProviderName('')
    setRepoCount(null)
  }

  async function googleSign() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    setProviderName('')
    setRepoCount(null)
  }

  async function linkedinSign() {
    await supabase.auth.signInWithOAuth({
      provider: 'linkedin',
    })
    setProviderName('')
    setRepoCount(null)
  }





  async function signOut() {
    await supabase.auth.signOut;
    setUser(null)
    setProviderName('')
    setRepoCount(null)
  }






  return (
    <div className="App">
      <header className="App-header">
        {!user ?
          <>
            <h3>Bienvenue sur MyAuth par Djibril SAMASSA</h3>
            <p>Connectez vous avec vos comptes d'autres plateforme</p>
          </>
          : null}

        {user ?
          // CONNECTE AVEC GITHUB
          providerName === "https://api.github.com" ?
            <>
              <div className='data'>
                <img className='profpic' src={user.avatar_url} />
                <h3>Bienvenue {user.name} vous êtes connecté avec votre compte Github</h3>
                <p>Adresse e-mail: {user.email}</p>
                <p>Nombre de repositories public sur Github : {repoCount?.length}  </p>
                <span className='repolist'>{repoCount?.slice(0, 10).map((repo) => {
                  return <li>{repo.name} /</li>
                })}...et plus</span>
              </div>
              <a className='link' href={link} target="_blank">Voir plus</a>
            </>
            // CONNECTE AVEC GOOGLE 
            : providerName === "https://www.googleapis.com/userinfo/v2/me" ?
              <div className='data'>
                <img className='profpic' src={user.avatar_url} />
                <h3>Bienvenue {user.name} vous êtes connecté avec votre compte Google</h3>
                <p>Adresse e-mail: {user.email}</p>
              </div>
              // CONNECTE AVEC LINKEDIN
              : providerName === "https://api.linkedin.com" ?
                <div>
                  <div className='data'>
                    <img className='profpic' src={user.avatar_url} />
                    <h3>Bienvenue {user.name} vous êtes connecté avec votre compte Linkedin</h3>
                    <p>Adresse e-mail: {user.email}</p>
                  </div>
                </div>
                : null
          : null}
        {user === null ?
          <div className='buttonC'>
            <button className='login' onClick={() => { githubSign() }}><Icon className='icon' icon="akar-icons:github-fill" width="30" height="30" /> Se connecter avec Github</button>
            <button className='login' onClick={() => { googleSign() }}><Icon className='icon' icon="ion:logo-google" width="30" height="30" />Se connecter avec Google</button>
            <button className='login' onClick={() => { linkedinSign() }}><Icon icon="bi:linkedin" width="30" height="30" />Se connecter avec Linkedin</button>
          </div>
          : <button className='logout' onClick={() => { signOut() }}><Icon className='icon' icon="ic:baseline-log-out" width="30" height="30" />Se déconnecter</button>}
      </header>
    </div>
  );
}

export default App;
