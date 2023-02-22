import './autocomplete.scss';
import {useRef} from 'react';
import Downshift from 'downshift';
export const Autocomplete = ({customKey, items, selectedItem='', onChange, itemToString}) => {
const buttonRef = useRef();
  return(
      <Downshift customKey={customKey} items={items} selectedItem={selectedItem}  onChange={onChange} itemToString={itemToString} >
      {
          ( {getInputProps,getItemProps,getMenuProps,getLabelProps,getToggleButtonProps,inputValue,highlightedIndex,selectedItem,isOpen, getRootProps} ) => {
                  const listClass = isOpen ? 'autocomplete__list autocomplete__list_open' : 'autocomplete__list';
                  const autocompleteLabelClass = inputValue || isOpen  ? 'autocomplete__label autocomplete__label_active' : 'autocomplete__label';
                  const autocompleteButtonClass = isOpen ? 'autocomplete__button autocomplete__button_open' : 'autocomplete__button';
                  return (
                      <div className={'autocomplete'}>
                          <div className="autocomplete__theme"  >
                          <label className={autocompleteLabelClass} {...getLabelProps()}>Выберите марку</label>
                          <input  onClick={() => buttonRef.current.click()} className='autocomplete__input'   {...getInputProps()} />
                          <button ref={buttonRef} className={autocompleteButtonClass}  aria-label={'toggle menu'}  {...getToggleButtonProps()}></button>
                          <ul className={listClass} {...getMenuProps()}>
                                  {isOpen && items
                                      .filter((item) => item[customKey].toLowerCase().includes(inputValue.toLowerCase()))
                                      .map((item, index) => (
                                          <li className='autocomplete__item'
                                                  {...getItemProps({
                                                      key: `${index}`,
                                                      item,
                                                      index,
                                                      style: {
                                                          backgroundColor:
                                                          highlightedIndex === index ? '#d0e6f4' : '',
                                                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                      },
                                                  })}
                                                  >
                                              {item[customKey]}
                                          </li>
                                      ))}
                          </ul>
                          </div>
                      </div>
              )
          }
  }
</Downshift>
  )
}