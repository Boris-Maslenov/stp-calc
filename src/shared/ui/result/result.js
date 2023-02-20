import plural  from 'plural-ru';
import { Button } from '../button/button';
import { BASE_URL } from "../../config";

export const Result = ({list, total}) => {
    console.log(list);
    return (
        <div className="app-result">
            <div className="flex-table result-table">
                <div className="flex-table__head">
                    <div className="flex-table__row">
                        <div className="flex-table__cell">Артикул</div>
                        <div className="flex-table__cell">Материал</div>
                        <div className="flex-table__cell">Цена*</div>
                        <div className="flex-table__cell">Кол-во</div>
                        <div className="flex-table__cell">Сумма</div>
                    </div>
                </div>
                <div className="flex-table__body">
                    {
                        list.map(({name, article, link, count, sum, price}, key) => {
                            return (
                                    <div key={key} className="flex-table__row">
                                        <div className="flex-table__cell result-table__article">{article}</div>
                                        <div className="flex-table__cell result-table__material"><a target="_blank" href={BASE_URL + link} className="">{name}</a></div>
                                        <div className="flex-table__cell result-table__price">{`${price} ₽`} </div>
                                        {/* FIX: проверка по article */}
                                        <div className="flex-table__cell result-table__count">{`${count} ${article === '00037-01-00' ? plural(count, 'банка', 'банки', 'банок') : plural(count, 'лист', 'листа', 'листов')}`}</div>
                                        <div className="flex-table__cell result-table__price-total">{`${sum}`} ₽</div>
                                    </div>
                            )
                        } )                   
                    } 
                </div>
            </div>
            <div className="total">
                <p className='total__sum'><span>Итого: </span>{`${total} ₽`}</p>
                <Button setDisabled={true}>{'Заказать'}</Button>
                {/* <button disabled className='app-button app-button_default'>Заказать</button> */}
            </div>
        </div>
  
    )
}