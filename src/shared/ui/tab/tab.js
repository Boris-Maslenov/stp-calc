import './tab.scss';
import {BODYS_MAP, ZONES_MAP} from '../../config';

export const Tab = ({zones, level, consts, body, onChange}) => {
    // tab-controls__item_active
    return(
        <div className="tab">
            <div className="tab-controls">
                <ul className="tab-controls__list">
                    <li className="tab-controls__item">
                        <div className="tab-controls__icon">
                            <img src="https://stpshopnn.ru/wp-content/levels/level-icon-maximum.svg" alt="Maximum" />
                        </div>
                        <div onClick={e => onChange('Maximum')} className="tab-controls__text">
                            <span className="tab-controls__title">Maximum</span>
                            <span className="tab-controls__description">Максимальная степень защиты</span>
                        </div>
                    </li>
                     <li onClick={e => onChange('Optimum')} className="tab-controls__item">
                        <div className="tab-controls__icon">
                            <img src="https://stpshopnn.ru/wp-content/levels/level-icon-base.svg" alt="Optimum" />
                        </div>
                        <div className="tab-controls__text">
                            <span className="tab-controls__title">Optimum</span>
                            <span className="tab-controls__description">Оптимальная степень защиты</span>
                        </div>
                    </li>
                    <li onClick={e => onChange('Base')} className="tab-controls__item">
                        <div className="tab-controls__icon">
                            <img src="https://stpshopnn.ru/wp-content/levels/level-icon-optimum.svg" alt="Base" />
                        </div>
                        <div className="tab-controls__text">
                            <span className="tab-controls__title">Base</span>
                            <span className="tab-controls__description">Базовая степень защиты</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="tab-content">
                <div className="flex-table zones-table">
                    <div className="flex-table__head">
                        <div className="flex-table__row">
                            <div className="flex-table__cell">Зонa обработки</div>
                            <div className="flex-table__cell">Материал</div>
                            <div className="flex-table__cell">Кол-во</div>                                      
                        </div>
                    </div>
                    <div className="flex-table__body">
                          {zones.map(({zone, materials}, key) => {
                            return(
                                    <div key={key} className="flex-table__row">
                                    <div className="flex-table__cell zones-table__visual">
                                            <img src={`${BODYS_MAP[body]}zones/${ZONES_MAP[zone]}`} alt={zone} />
                                            <span>{zone}</span>
                                    </div>
                                    <div className="flex-table__cell zones-table__material-link">
                                        {materials.map( ({name}, key)=> <a key={key} href="#">{name}</a> ) }
                                    </div>
                                    <div className="flex-table__cell zones-table__material-count">
                                        {materials.map( ({count}, key)=> <span key={key}>{count}</span> ) }
                                    </div>                                      
                                </div>
                            )
                          })}
                    </div>
                </div>
            </div>
    </div>
    )
}