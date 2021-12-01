import Image from 'next/image'

const CardapioItem = ({ item, categoria, index }) => {

    return (
        <div className='cardapioItem' key={index}>

            <div className="cardapioItem--image">
                <Image width={50} height={50} src={`/${categoria.nome}.png`} alt={item} />
            </div>

            <div className="cardapioItem--text">
                <span>
                    {item.nome}
                </span>
                {item.descricao}
            </div>

            <div className="cardapioItem--price">
                {item.preco}
            </div>



        </div>
    )
}

export default CardapioItem