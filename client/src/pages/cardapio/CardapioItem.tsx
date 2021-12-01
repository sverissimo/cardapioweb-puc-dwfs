import Image from 'next/image'

export const CardapioItem = ({ item, categoria }) => {

    return (
        <div className='cardapioItem'>

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
