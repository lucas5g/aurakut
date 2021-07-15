import React, { useEffect, useState } from 'react'
import { Box } from '../src/components/Box'
import { MainGrid } from '../src/components/MainGrid'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} alt="Perfil" />
      <hr />

      <p>
        <a href={`https://github.com/${githubUser}`} className="boxLink">
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox({ title, items }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length})
      </h2>
      <ul>
        {items.map((follower, index) => {
          if (index < 6) {
            return (
              <li key={index}>
                <a href={`https://github.com/${follower.login}.png`}>
                  <img src={follower.avatar_url} alt="" />
                </a>
              </li>
            )
          }
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const user = 'lucas5g'
  const [communities, setCommunities] = useState([{
    id: 123123,
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])

  const peopleFavorite = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  const [followers, setFollowers] = useState([])

  useEffect(() => {
    fetch('https://api.github.com/users/peas/followers')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setFollowers(res)
      })
  }, [])
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className='subTitle'>
              O que você deseja fazer?
              <form onSubmit={event => {
                event.preventDefault()

                const data = new FormData(event.target)
                const community = {
                  id: new Date().toISOString(),
                  title: data.get('title'),
                  image: data.get('image')
                }
                setCommunities([...communities, community])
              }}>

                <div>
                  <input
                    placeholder="Qual vai ser o nome da sua comunidade?"
                    aria-label="Qual vai ser o nome da sua comunidade?"
                    name="title"
                  />
                </div>
                <div>
                  <input
                    placeholder="Coloque uma URL para usarmos de capa"
                    aria-label="Coloque uma URL para usarmos de capa"
                    name="image"
                  />
                </div>
                <button>
                  Criar comunidade
                </button>
              </form>
            </h2>
          </Box>
        </div>
        <div className="profileRealationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map(community => (
                <li key={community.id}>
                  <a href={`/users/${community.title}`}>
                    <img src={community.image} alt={community.title} />
                    <span>{community.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({peopleFavorite.length})
            </h2>
            <ul>

              {peopleFavorite.map(people => (
                <li>
                  <a href={`/users/${people}`} key={people}>
                    <img src={`https://github.com/${people}.png`} alt={people} />
                    <span>{people}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>

    </>
  )
}