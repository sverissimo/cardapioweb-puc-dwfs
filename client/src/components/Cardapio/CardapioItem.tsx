import Image from 'next/image'

const CardapioItem = ({ item, categoria }) => {

    return (
        <div className='cardapioItem'>

            <div className="cardapioItem--image">
                <Image width={50} height={50} src={`/${categoria.nome}.png`} alt={item} />
            </div>

            <div className="cardapioItem--div">
                <span className="cardapioItem--text">
                    {item.nome}
                </span>
                <span className="cardapioItem--description">

                    {item.descricao}
                </span>
            </div>

            <div className="cardapioItem--price">
                {item.preco}
            </div>



        </div>
    )
}

export default CardapioItem