import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import Sticker from '../src/components/Sticker'
import Loading from '../src/components/Loading';
import Delete from '../src/components/Delete';

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQxNDgwOSwiZXhwIjoxOTU4OTkwODA5fQ.9etS6c0i8z_qOgBcNIBBD5E9UmiXHYpTSzEanR6UMks'
const SUPABASE_URL = 'https://mdgilhijonzeeitkftgw.supabase.co'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function realTimeMsg(addMsg) {
    return supabase.from('mensagens').on('INSERT', (resposta) => {
        addMsg(resposta.new)
    }).subscribe()
}

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState('')
    const [lista, setLista] = React.useState([]
        /*{
            id: 1,
            de: 'marcosbauab',
            texto: ':sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_1.png'
        }*/
    )

    const router = useRouter()
    //pega aquilo que vem depois do ? na URL, nesse caso, do user
    const usuarioLogado = router.query.user
    // ./Sua lógica vai aqui

    if(usuarioLogado == ''){
        router.push('/')
    }

    React.useEffect(() => {
        setTimeout(() => {
            supabase.from('mensagens')
                .select("*")
                .order('id', { ascending: false })
                //desestruturação de dados {}
                .then(({ data }) => {
                    setLista(data)
                })

            realTimeMsg((novaMensagem) => {
                //console.log("nova mensagem: ", novaMensagem)
                setLista((valorAtual) => {
                    return [
                        novaMensagem,
                        ...valorAtual
                    ]
                })
            })

        }, 1000);
    }, [])


    function lidaMensagem(msg) {
        const mensagem = {
            //id: lista.length + 1,
            de: usuarioLogado,
            texto: msg
        }

        supabase.from('mensagens')
            .insert([
                //objeto com os mesmos campos do supabase
                mensagem
            ])
            .then(({ data }) => {
                //aqui não gerencia mais a renderização em tela
                /*setLista([
                    //pega todos os elementos do array e põem junto
                    data[0],
                    ...lista,
                ])*/
            })


        setMensagem('')
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/09/wall-e-access-to-an-axiom-life-pod-1024x576.jpeg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            {lista.length == 0 ? <Loading /> :
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: { xs:'0', sm:'5px'},
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        height: '100vh',
                        maxWidth: {xs:'100%', sm: '95%'},
                        maxHeight: {xs:'100vh',  sm: '95vh'},
                        padding: {xs:'15px', sm: '32px'},
                    }}
                >
                    <Header />
                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            height: '80%',
                            backgroundColor: appConfig.theme.colors.neutrals[600],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                        }}
                    >


                        <MessageList mensagens={lista} updateLista={() => {
                            
                            supabase.from('mensagens')
                            .select("*")
                            .order('id', { ascending: false })
                            //desestruturação de dados {}
                            .then(({ data }) => {
                                setLista(data)
                            })
                            
                        }}/>

                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                value={mensagem}
                                onChange={(event) => {
                                    setMensagem(event.target.value)
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && mensagem != '') {
                                        e.preventDefault()
                                        lidaMensagem(mensagem)
                                    } else if (e.key === 'Enter' && mensagem == '') {
                                        e.preventDefault()
                                    }
                                }}
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                            />
                            <Sticker onStickerClick={(sticker) => {
                                //pegando pelo callback do próprio componente
                                console.log('FORA DO COMP: ', sticker)
                                lidaMensagem(':sticker:' + sticker)
                            }} />
                        </Box>
                    </Box>
                </Box>
            }

        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    const router = useRouter()
    //pega aquilo que vem depois do ? na URL, nesse caso, do user
    const usuarioLogado = router.query.user
    
    const [indiceMsg, setIndiceMsg] = useState()

    const [visivel, setVisivel] = useState(false)

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                width: '100%',
                height: 'auto',
                flexDirection: 'column-reverse',
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                padding: '8px 10px 5px 5px',
            }}
        >
            {props.mensagens.map((mensagem, ind) => {

                return (
                    <div onMouseEnter={() => {
                            setVisivel(true)
                            setIndiceMsg(ind)
                        }} onMouseLeave={() => {
                                setVisivel(false)
                            }}>
                        <Text
                            key={mensagem.id}
                            tag="li"
                            styleSheet={mensagem.de == usuarioLogado ? ({
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                width: {sm:'100%'},
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                },
                                transition: '.2s',
                            }) : ({
                                width: {sm:'100%'},
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                hover: {                                   
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                },
                                transition: '.2s'
                            })}
                        >

                            {ind + 1 < props.mensagens.length && props.mensagens[ind].de == props.mensagens[ind + 1].de ?
                                ('') : (<Box
                                    styleSheet={mensagem.de == usuarioLogado ? ({
                                        marginBottom: '8px',
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                        padding: '5px',
                                        borderRadius: '5px',
                                    }) :
                                        ({ marginBottom: '8px', })}
                                >                                    
                                    <Image
                                        styleSheet={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                        }}
                                        src={`https://github.com/${mensagem.de}.png`}
                                    />
                                    <Text tag="strong">
                                        {mensagem.de}
                                    </Text>
                                    <Text
                                        styleSheet={{
                                            fontSize: '10px',
                                            marginLeft: '8px',
                                            color: appConfig.theme.colors.neutrals[300],
                                        }}
                                        tag="span"
                                    >
                                        {(new Date().toLocaleDateString())}
                                    </Text>
                                </Box>)}
                            
                            {/*checar se a mensagem começa com :sticker:, que mostra que ela não é só texto */}
                            {mensagem.texto.startsWith(':sticker:') ?

                                (<Image src={mensagem.texto.replace(':sticker:', '')}
                                    styleSheet={{
                                        width: {xs:'30vh', sm: '50vh'}
                                    }}
                                />) :
                                
                                (mensagem.texto)
                            }
                            {mensagem.de == usuarioLogado && visivel && ind == indiceMsg ? 
                            <Delete idMensagem={mensagem.id} onDelete={(chave) => {
                                let res = confirm('Deseja excluir essa mensagem ?')
                                if(res == true){
                                    supabase
                                    .from('mensagens')
                                    .delete()
                                    .match({ id: chave })
                                    .then(() => {
                                        props.updateLista()
                                    })
                                }
                                
                            }}/> : ('')}    
                        </Text>
                    </div>
                )
            })}

        </Box>
    )
}