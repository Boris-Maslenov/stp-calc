import './autocomplete.scss';
import {useState, useEffect, useRef} from 'react';

export const Autocomplete = ({options=[], label=null, onChange=null, getOptionLabel = (option) => option}) => {
    // options - массив значений
    // label - название placeholder-a
    // onChange - функция, возвращает выбранное значение
    // getOptionLabel = функция для кастомизации структуры списка по умолчанию option

    const wrapElement = useRef(null); // Элемент
    const selectRef = useRef(null); // аналог select но с нормализованными данными
    const valueRef = useRef(null); // аналог value нужен для очистки
    const [isFocused, setIsFocused] = useState(false); // Состояние обертки
    const [isOpen, setIsOpen] = useState(false); // Состояние списка
    const [value, setValue] = useState(''); // Контролируемый input
    const [select, setSelect] = useState(null); // То что выбрано из выпадающего списка
    const [status, setStatus] = useState(false); // Статус фильтрации (false = показываем список без фильтрации / true - фильтруем )

    useEffect(() => {
      const onClosedListElem = (e) => {
          if(!wrapElement.current.contains(e.target)) {
            if(isOpen || isFocused){
              setIsFocused(false);
              setIsOpen(false);
              setStatus(false);
              recoveryValueOnClosed();
            }
          }
      }
      document.addEventListener('click', onClosedListElem);
      return () => {
        document.removeEventListener('click', onClosedListElem);
      }
    }, [isOpen, isFocused]);

    // восстановление данных при закрытии
    const recoveryValueOnClosed = () => {
      if(valueRef.current === '') {
        addValuesToSelect(null);
        setValue('');
        return;
      }
      // если есть выбор но фактическое значение input не соотвестваует
      if(selectRef.current && selectRef.current !== value) {
        setValue(selectRef.current);
      }
      // если нет соответствий то очищаем инпут
      if(!selectRef.current) {
        setValue('');
      }
    }

    // Ввод данных в input 
    const onChangeHandler = (e) => {
       const data = e.target.value;
       setStatus(true);
       setValue(data);
       valueRef.current = data;
      if(!isOpen){
        setIsOpen(true);
      }
    }

    // клик по родительскому элементу
    const wrapElemClickHandler = (e) => {
      if(!isFocused) {
        setIsFocused(true);
      }
    }

    // Клик по инпуту
    const inputClickHandler = () => {
        if(isFocused) {
            isOpen ? setIsOpen(false) : setIsOpen(true);
        } else {
          setIsFocused(true);
          setIsOpen(true);
        } 
    }

    // Потеря фокуса на списке
    const listBlurHandler = () => {
      if(isOpen){
        setIsOpen(false);
      }
    }

    const addValuesToState = (data) => {
      const dataNormalize =  getOptionLabel(data);
      setStatus(false);
      addValuesToSelect(data);
      setValue(dataNormalize);
      selectRef.current = dataNormalize;
      valueRef.current = dataNormalize;
      setIsOpen(false);
    } 

    const addValuesToSelect = (data) => {
      setSelect(data);
      if(onChange){
        onChange(data);
      }
    }

    // Добавляем данные из выбранного элемента 
    const selectHandler = (e, data) => {
      // Уберем всплытие события чтобы лишний раз не запускать функцию очистки
        e.preventDefault();
        e.stopPropagation();
        addValuesToState(data);
    }

    const renderList = (data) => {
      const result = data.filter( (option) => {
          if(!status) return true; // если не фильтруем возвращаем как есть
          const title = getOptionLabel(option) + ''; // можно убрать, но сделать проверку  на строку
          return title.toLowerCase().includes(value.toLowerCase().trim());
      }).map((film, i) => <li tabIndex="1" onClick={e => {selectHandler(e,film)}}  key={i} className="autocomplete__item">{getOptionLabel(film)}</li>);
      return result.length ? result : <li className="autocomplete__item">Нет опций</li>
    }

    const list = renderList(options);

    const autocompleteClass = !isFocused ? 'autocomplete' : 'autocomplete autocomplete_focused';
    const autocompleteLabelClass = isOpen ||  value ? 'autocomplete__label' : 'autocomplete__label autocomplete__label_active';
    const autocompleteButtonClass = isOpen ? 'autocomplete__button autocomplete__button_open' : 'autocomplete__button';
    const listClass = isOpen ? 'autocomplete__list autocomplete__list_open' : 'autocomplete__list';

    return (
            <div onClick={e => wrapElemClickHandler(e)}  tabIndex="-1" ref={wrapElement}  className={autocompleteClass}>
                <div  tabIndex="-1" className="autocomplete__theme">
                    <span  className={autocompleteLabelClass}>{label || 'Set Option:'}</span>
                    <input onClick={inputClickHandler} value={ value }  onChange={onChangeHandler}  className="autocomplete__input" type="text" />
                    <button tabIndex="-1" onClick={inputClickHandler} className={autocompleteButtonClass} type="button"></button>
                    <ul onBlur={e => listBlurHandler()} tabIndex="-1" className={listClass}>
                        { isOpen ? list : void 0 }
                    </ul>
                </div>
            </div>
    );
};