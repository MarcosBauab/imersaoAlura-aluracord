import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components'; 
import { useRouter } from 'next/router'
import React from 'react';
import imagem from '../public/usuarios.jpg'
  

function Titulo(propriedades){
    const Tag = propriedades.tag
    return (
        <>
            <Tag>{propriedades.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['050']};
                height: 26px;
                width: 237px;
            }
            `}</style>
        </>  
    )
}

/*function HomePage() {
    return (
        <>
            <GlobalStyle />
            <Titulo tag="h1">Welcome back!</Titulo>
            <h2>Concord</h2>
        </>
    )
}
  
export default HomePage*/

export default function PaginaInicial() {
  //const username = 'marcosbauab';

  //state, ela retorna um array com 2 posições, por isso a desestruturação
  const [username, setUsername] = React.useState('')
  //os uses... são hooks
  const router = useRouter()

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event){
                event.preventDefault()
                //envia pro chat com uma informação de username da pessoa para pegar lá
                router.push(`/chat?user=${username}`)
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Salve!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>
            {/*<a href="https://br.freepik.com/fotos-vetores-gratis/pessoas">Pessoas vetor criado por studiogstock - br.freepik.com</a>*/}
            <TextField
              onChange={function handler(event){
                  //valor da variável
                  const user = event.target.value
                  if(user.length > 2){
                      //seta o novo user
                      setUsername(user)
                  } else {
                      setUsername('')
                  }
              }}
              placeholder='Digite seu nome no Github...'
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />

            {/*<input 
              type="text"
              value={username}
              onChange={function handler(event){
                  //valor da variável
                  const user = event.target.value
                  //seta o novo user
                  setUsername(user)
              }}
            />*/}

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
              overflow: 'hidden',
            }}
          >
            
            <Image
              styleSheet={{
                display: 'block',
                height: '166px',
                borderRadius: '50%',
                marginBottom: '16px',
                width: '250%',
              }}
              src={username.length > 2 ? `https://github.com/${username}.png` : imagem.src}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}