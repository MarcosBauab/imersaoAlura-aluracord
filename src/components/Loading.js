export default function Loading() {
    return (
        <>
            <div>
                <img src="/discord.png" />
            </div>
            <style jsx>
                {`
                    div{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    img 
                    {
                        
                        height: 30vh;
                        width: auto;
                        
                        -webkit-animation: giro ease-in-out 3s;
                        -webkit-animation-iteration-count:infinite;
                    }
                    @-webkit-keyframes giro {
                        0% {-webkit-transform:rotate(0deg);
                            filter: opacity(0);
                            }
                        50% {-webkit-transform:rotate(360deg);
                             filter: opacity(100%);
                            }
                        100% {-webkit-transform:rotate(0deg);}
                    }
                    @media (max-width: 500px){
                        img{
                            height: 20vh;
                            width: auto;
                        }
                    }
                `}
            </style>
        </>
    )
}