import Link from 'next/link'
import styles from './styles.module.scss'


const { adminHeader } = styles

const AdminHeaderTemplate = ({ menuItems }) => {

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
                            <i className="bi bi-box-arrow-right"></i>
                        </li>

                    </ul>

                </a>
            </Link>
        </div>
    )
}

export default AdminHeaderTemplate