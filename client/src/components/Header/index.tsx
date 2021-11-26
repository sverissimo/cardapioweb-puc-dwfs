import styles from './styles.module.scss'

export function Header() {
    const { headerContainer, logoStrip, mainImage, stripContent } = styles
    return (
        <header className={headerContainer}>
            {/* <div className={styles.headerContent}> */}


            <div className={logoStrip}>
                <div className={stripContent}>

                    <img src="/logo.png" alt="logo" height='78px' width='78px' />
                    <h1>
                        Cardápio Web
                    </h1>
                    <p>
                        Cardápio digital ilustrativo para fins de TCC - DWFS PUC 2021
                    </p>
                    <span>
                        Login
                    </span>
                    <img src="/loginIcon.svg" alt="" height='20rem' width='20rem' />
                </div>
            </div>
            <div className={mainImage}>

                {/*  <img src="/headerImage.PNG" alt="header" /> */}
            </div>
            {/*            </div> */}
        </header>
    )
}