import { AiOutlineDelete } from 'react-icons/ai'

export default function Delete(props) {
    let chave = props.idMensagem

    return (
        <>
            <div>
                <button onClick={() => {
                    props.onDelete(chave)
                }}><AiOutlineDelete /></button>
            </div>
            <style jsx>
                {`
                   div{
                       display: flex;
                       position: absolute;
                       
                       width: auto;

                       top: -10px;
                       left: 8%;

                   } 
                   button{

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        cursor: pointer;
                        border: none;
                        background-color: transparent;
                        border-radius: 8px;
                        padding: 2px;
                        color: white;
                        font-size: 1.3rem;
                        width: auto;
                        transition: .2s;

                   }
                   button:hover {
                       background-color: #48474d;
                   }
                `}
            </style>
        </>
    )
}