type Item = {
    endPoint: string,
    title: string
}

type ItemsArray = Item[]

export const adminMenuItems: ItemsArray = [
    {
        endPoint: '/',
        title: 'Home'
    },
    {
        endPoint: '/gerenciar/categorias',
        title: 'Categorias'
    },
    {
        endPoint: '/gerenciar/formaPagamento',
        title: 'Formas de pagamento'
    },
    {
        endPoint: '/gerenciar/restaurantes',
        title: 'Restaurantes'
    },
    {
        endPoint: '/gerenciar/usuarios',
        title: 'Usuários'
    },
    {
        endPoint: '/relatorios',
        title: 'Relatórios'
    }
]

export const parceiroMenuItems: ItemsArray = [
    {
        endPoint: '/',
        title: 'Home'
    },
    {
        endPoint: '/gerenciar/produtos',
        title: 'Cardápio'
    },
    {
        endPoint: '/gerenciar/restaurantes',
        title: 'Dados do Restaurante'
    }
]