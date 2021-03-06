import React from "react";

const Dop = ({state, toggle, toggleAdditional}) => {
    return (
        <section className="checkout__dop dop checkout__title">
            <div className="dop__title">Выберите дополнительные услуги к заказу</div>
            <div onClick={e => toggle(e)} className={"dop__check-items collapse" + (state.active ? ' collapse_active' : '')}>
                <div className="collapse__selected">УСЛУГИ К ЗАЯВКЕ: {state.additional_requirements.map(item => (item.selected ? (item.name + ', ') : ''))}</div>
                <div onClick={(e) => e.stopPropagation()} className="collapse__items">
                    {state.additional_requirements.map(item => {
                        return (
                            <label key={item.id} onClick={(e) => toggleAdditional(e, item.id)} className="dop__check check-wrap">
                                {item.name}
                                {item.selected ?
                                    <input type="checkbox" checked={true} onChange={() => {}} className="check-wrap__input"/>:
                                    <input type="checkbox" checked={false} onChange={() => {}} className="check-wrap__input"/>}
                                <span className="check-wrap__mark"></span>
                            </label>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

export default Dop;