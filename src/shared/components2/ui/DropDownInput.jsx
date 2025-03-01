import { Check, Plus, X } from '@phosphor-icons/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import useSearchStore from 'store/searchStore.js';

export const DropDownInput = ({
  id,
  size = 'md',
  inset = false,
  state = 'rest',
  validation = 'none',
  direction = 'rtl',
  title,
  placeholder,
  value,
  headingIcon,
  clearAction,
  link,
  linkText,
  successMessage,
  disabled,
  className,
  onChange,
  field,
  inputProps,
  dropdownArray,
  selectedItems,
  setSelectedItems,
  actionLink,
  actionText,
  singleSelect = false,
  form: { errors, touched },
}) => {
  const [dropdownRef, setDropdownRef] = useState(null);
  const [inputClasses, setInputClasses] = useState('');
  const [inputValue, setInputValue] = useState(value || '');
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [filteredDropdownArray, setFilteredDropdownArray] = useState(dropdownArray);
  const [selectedList, setSelectedList] = useState([]);

  const getInputClasses = useCallback(() => {
    let baseClass = 'c-input';
    let classes = baseClass;

    classes += ` ${baseClass}-${size}`;
    if (inset) classes += ` ${baseClass}-inset`;
    classes += ` ${baseClass}-${state}`;
    if (touched[field.name] && errors[field.name]) classes += ` ${baseClass}-error`;

    classes += ` ${baseClass}-${direction}`;

    classes += ` ${className || ''}`;

    // return 'cinput cinput-sm cinput-rest cinput-ltr';
    return classes;
  }, [className, disabled, state, validation, size, inset, direction, errors, touched]);
  const clearClicked = async () => {
    setInputValue('');
  };

  useEffect(() => {
    setInputClasses(getInputClasses());
  }, [disabled, getInputClasses, validation, errors, touched, successMessage]);

  useEffect(() => {
    // Function to handle clicks outside of the dropdown box
    const handleClickOutside = (event) => {
      if (dropdownRef && !dropdownRef.contains(event.target)) {
        // Click occurred outside of the dropdown box
        setDropdownIsOpen(false);
      }
    };

    // Attach event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Detach event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const filteredArray = dropdownArray.filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredDropdownArray(filteredArray);
  }, [inputValue, dropdownArray]);

  useEffect(() => {
    const updatedSelectedList = dropdownArray.filter((item) => selectedItems.includes(item.id));
    setSelectedList(updatedSelectedList);
    onChange(selectedItems);
  }, [selectedItems, dropdownArray]);

  const onFocus = () => {
    setDropdownIsOpen(true);
  };

  const clearFilter = useSearchStore((state) => state.clearFilter);
  const clearQuery = useSearchStore((state) => state.clearQuery);

  const onItemSelect = (id) => {
    // Check if the id exists in selectedItems
    const index = selectedItems.indexOf(id);
    // If the id exists, remove it from selectedItems; otherwise, add it
    if (index !== -1) {
      // Remove the id from selectedItems
      const updatedSelectedItems = [...selectedItems.slice(0, index), ...selectedItems.slice(index + 1)];
      setSelectedItems(updatedSelectedItems);
    } else {
      // Add the id to selectedItems
      setSelectedItems([...selectedItems, id]);
    }

    if (singleSelect) {
      setSelectedItems([id]);
      if (index !== -1) {
        const updatedSelectedItems = [selectedItems[0]];
        clearFilter();
        clearQuery();
        setSelectedItems([updatedSelectedItems]);
      }
      setDropdownIsOpen(false);
    }
  };

  return (
    <div className={inputClasses} ref={setDropdownRef}>
      <div className={'label-wrapper'}>
        {title && <label htmlFor={field.name}>{title}</label>}
        {link && <a href={link}>{linkText}</a>}
      </div>
      <div className={'input-wrapper'}>
        {headingIcon && <span className="action-icon text-left">{headingIcon}</span>}
        <input
          type={'text'}
          id={id}
          name={field.name}
          placeholder={placeholder}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onFocus={onFocus}
          value={inputValue}
          {...inputProps}
        />
        {clearAction && (
          <button type={'button'} onClick={clearClicked} className={'action-icon text-right'}>
            <X />
          </button>
        )}
      </div>
      {dropdownIsOpen && (
        <div className={'input-dropdown'}>
          <ul className={'dropdown-wrapper'}>
            {filteredDropdownArray.length > 0 ? (
              filteredDropdownArray.map(({ id, title }) => (
                <li className={'dropdown-item'} key={id} onClick={() => onItemSelect(id)}>
                  <span className={'inline-flex flex-1 text-body-small'}>{title}</span>
                  {selectedItems.includes(id) && <Check size={16} className={'inline-flex'} />}
                </li>
              ))
            ) : (
              <li className={'text-center justify-center'}>
                <span className={'inline-flex flex-1 text-body-small'}>موردی یافت نشد</span>
              </li>
            )}
          </ul>

          {actionLink && actionText && (
            <Link
              to={actionLink}
              className={
                'flex w-full justify-center border-t-2 text-center mt-1 p-4 font-button-medium cursor-pointer text-light-primary-text-rest'
              }
            >
              <span>{actionText}</span>
              <Plus size={13} className={'ml-2'} />
            </Link>
          )}
        </div>
      )}
      <div className={'text-right'}>
        {selectedList.map(({ id, title }) => (
          <div
            key={id}
            className={
              'inline-flex flex-row items-center bg-light-neutral-background-low ml-2 my-1 border border-light-neutral-border-low-rest h-[30px] py-[6px] px-2 rounded-[8px] [direction:rtl]'
            }
          >
            <span className={'flex flex-1 pl-2 text-body-small'}>{title}</span>
            <X
              size={13}
              className={'cursor-pointer text-light-neutral-text-low '}
              onClick={() => {
                onItemSelect(id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

DropDownInput.propTypes = {
  id: PropTypes.string,
  // name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'number']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  inset: PropTypes.bool,
  state: PropTypes.oneOf(['rest', 'typing', 'filled', 'disabled', 'read-only']),
  validation: PropTypes.oneOf(['none', 'success', 'error']),
  direction: PropTypes.oneOf(['rtl', 'ltr']),
  innerLabel: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  headingIcon: PropTypes.element,
  clearAction: PropTypes.bool,
  customAction: PropTypes.bool,
  link: PropTypes.string,
  linkText: PropTypes.string,
  caption: PropTypes.string,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  inputProps: PropTypes.object,
  dropdownValue: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  selectedItems: PropTypes.array,
  setSelectedItems: PropTypes.func,
  actionLink: PropTypes.string,
  actionText: PropTypes.string,
  dropdownArray: PropTypes.array,
  singleSelect: PropTypes.bool,
};
