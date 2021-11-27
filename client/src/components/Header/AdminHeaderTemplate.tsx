import Link from 'next/link'
import styles from './styles.module.scss'


const { adminHeader } = styles

const AdminHeaderTemplate = () => {

    return (
        <div className={adminHeader}>
            <Link href='/login'>
                <a>
                    <ul className="nav navbar-nav">
                        <li className='dropdown'>
                            <a className="dropdown-toggle"
                                href="#" role="button" id="dropdownMenuLink"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-list"></i>
                            </a>

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li>
                                    <Link href="/">
                                        <a className="dropdown-item">Home</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/categorias">
                                        <a className="dropdown-item" >Categorias</a>
                                    </Link>
                                </li>
                                <li><a className="dropdown-item" href="#">Restaurantes</a></li>
                                <li><a className="dropdown-item" href="#">Usuários</a></li>
                            </ul>

                        </li>
                        <li>
                            <i className="bi bi-box-arrow-right"></i>
                        </li>

                    </ul>

                </a>
            </Link>
        </div>
    )
}

//export default AdminHeaderTemplate

export default AdminHeaderTemplate