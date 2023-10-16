import './NotFound.css'

export const NotFound = () => {
    const return_back = () => {
        window.history.back()
    }

    return (
        <div className="box">
            <div className="box__ghost">
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>
                <div className="symbol"></div>

                <div className="box__ghost-container">
                    <div className="box__ghost-eyes">
                        <div className="box__eye-left"></div>
                        <div className="box__eye-right"></div>
                    </div>
                    <div className="box__ghost-bottom">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="box__ghost-shadow"></div>
            </div>

            <div className="box__description">
                <div className="box__description-container">
                    <div className="box__description-title">Извините</div>
                    <div className="box__description-text">Страница не найдена - 404</div>
                </div>

                <div className="box__button" onClick={return_back}>Вернуться назад</div>
            </div>
        </div>
    )
}