export default function ClosePopUpButton({ close, title = 'Fechar' }) {
    return (
        <div style={{
            position: 'absolute',
            top: '0.4%',
            right: '0.4%'
        }}>
            <div>
                <i
                    className="bi-x-square-fill"
                    title={title}
                    style={{ cursor: 'pointer', color: 'red', fontSize: '2rem' }}
                    onClick={close} >

                </i>
            </div>
        </div>
    )
}
