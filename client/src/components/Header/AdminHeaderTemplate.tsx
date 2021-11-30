import Link from 'next/link'
import styles from './styles.module.scss'


const { adminHeader } = styles

const AdminHeaderTemplate = ({ menuItems, logOut }) => {

    return (
        <div className={adminHeader}>
            <ul className="nav navbar-nav">
                <li className='dropdown'>
                    <a className="dropdown-toggle"
                        href="#" role="button" id="dropdownMenuLink"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-list"></i>
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {menuItems.map(({ endPoint, title }, i) =>
                            <li key={i}>
                                <Link href={endPoint}>
                                    <a className="dropdown-item">{title}</a>
                                </Link>
                            </li>
                        )}
                    </ul>
                </li>
                <li>
                    <Link href='/'>
                        <a>
                            <i className="bi bi-box-arrow-right" onClick={() => logOut()} />
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminHeaderTemplate