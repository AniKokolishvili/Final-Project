import React, { useEffect, useState } from 'react';

type Option = {
    label: string;
    value: string;
};

// type DropdownProps = {
//     options: Option[];
// };



const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const [manufacturer, setManufacturer] = useState<any[]>([]);

    //manufucturer
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://static.my.ge/myauto/js/mans.json');
            const jsonData = await response.json();
            setManufacturer(jsonData);
        };
        fetchData();
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: string) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    return (
        <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => handleToggle()}>
                <select>
                    {isOpen && (
                        <option className="dropdown-menu">

                            {manufacturer.map(item => (
                                <label key={item.man_id} className="dropdown-option">
                                    <input
                                        type="checkbox"
                                        value={item.man_id}
                                        // checked={selectedOptions.includes(item.value)}
                                        onChange={() => handleOptionClick(item.value)}
                                    />
                                    {item.man_name}
                                </label>
                            ))}

                        </option>
                    )}
                </select>
            </div>

        </div>
    );
};

export default Dropdown;
