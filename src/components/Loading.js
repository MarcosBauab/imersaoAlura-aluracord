export default function Loading() {
    return (
        <>
            <img src="/discord.png" />
            <style jsx>
                {`
                    img 
                    {
                        position: fixed;
                        height: 30vh;
                        width: auto;
                        left: 43.5%;
                        top: 35vh;
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
                `}
            </style>
        </>
    )
}