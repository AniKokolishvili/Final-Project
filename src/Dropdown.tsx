// import React, { Component, useEffect, useMemo, useState } from 'react'
// import { default as ReactSelect } from "react-select";
// import { components } from "react-select";



// function Dropdown() {
//     const [manufacturer, setManufacturer] = useState<any[]>([]);

//     const [isOpen, setIsOpen] = useState<boolean>(false)

//     const handleClick = () => {
//         setIsOpen(!isOpen)
//     }



//     //manufucturer
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch('https://static.my.ge/myauto/js/mans.json');
//             const jsonData = await response.json();
//             setManufacturer(jsonData);
//         };
//         fetchData();
//     }, []);

//     let Drop;
//     useMemo(() => {
//         if (isOpen) {
//             const Option = (props: { label: 'type' }) => {
//                 return (<components.Option {...props}>
//                     <div>
//                         {manufacturer && manufacturer.map((item) => {
//                             if (item.is_car === "1") {
//                                 return <label key={item.man_id}>
//                                     <input type="checkbox"
//                                     />
//                                     {item.man_name}
//                                 </label>
//                             }
//                         }
//                         )}
//                     </div>

//                 </components.Option>)
//             }

//         }
//     }, [isOpen])

//     return (
//         <span
//             data-toggle="popover"
//             data-trigger="focus"
//             data-content="Please selecet account(s)">
//             {/* <button
//                 area-aria-haspopup="true"
//                 // disableElevation
//                 // endIcon={}
//                 onClick={() => handleClick()}
//             >
//                 {Drop || 'Select'}
//             </button> */}
//             <ReactSelect
//                 options={manufacturer}
//                 isMulti
//                 closeMenuOnSelect={false}
//                 hideSelectedOptions={false}
//                 onChange={handleClick}
//                 value={isOpen}
//             />

//         </span>
//     )
// }

// export default Dropdown


import React from 'react'

function Dropdown() {
    return (
        <div>

        </div>
    )
}

export default Dropdown

//queryparameter for url change