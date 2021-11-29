import ClosePopUpButton from './CloseButon'
import styles from './popUp.module.scss'

const PopUpDialog = (props) => {
    const { popUpWindow } = styles
    return (
        <div className={popUpWindow}>
            <ClosePopUpButton title='' close={props.close} />
            {props.children}
        </div>
    )
}

export default PopUpDialog
