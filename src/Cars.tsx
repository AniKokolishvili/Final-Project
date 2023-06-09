import React, { ComponentType, useEffect, useState } from 'react'
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import CarList from './CarList';
import Select, {
    components,
    ControlProps,
    GroupBase,
    MultiValueGenericProps,
    Props,
    StylesConfig,
} from 'react-select';

function Cars() {
    enum SortOrder {
        DecreasingDate = 1,
        IncreasingDate = 2,
        DecreasingPrice = 3,
        IncreasingPrice = 4,
        DecreasingMileage = 5,
        IncreasingMileage = 6,
    }

    const [dark, setDark] = useState<boolean>(true)
    const [clickedCar, setClickedCar] = useState<boolean>(true)

    const clickedCarTheme = {
        borderBottom: 'solid #fd4100',
        borderWidth: 'thin',
    }

    const carLogoFill = clickedCar ? '#fd4100' : 'none'



    const theme = {
        backgroundColor: dark ? 'black' : 'white',
        color: dark ? 'white' : 'black',
        width: '24px',
        height: '24px',
    }

    const theme2 = {

        backgroundColor: dark ? 'white' : 'black',
        color: dark ? 'black' : 'white',
        width: '24px',
        height: '24px',

    }

    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DecreasingDate);

    const [manufacturer, setManufacturer] = useState<any[]>([]);
    const [carMakes, setCarMakes] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([])
    const [products, setProducts] = useState<any[]>([]);

    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedManufacturer, setSelectedManufacturer] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);


    const [manValue, setManValue] = useState<string>('ყველა მწარმოებელი');
    const [manID, setManID] = useState<number>(-1);
    const [makeValue, setMakeValue] = useState<string>('');

    // const [manID2, setManID2] = useState<string>('');
    // const [carMakes2, setCarMakes2] = useState<any[]>([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${manID2}`);
    //         const jsonData = await response.json();
    //         setCarMakes2(jsonData.data);
    //     };
    //     fetchData();
    // }, [manID2]);


    //formik

    //manufucturer
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://static.my.ge/myauto/js/mans.json');
            const jsonData = await response.json();
            setManufacturer(jsonData);
        };
        fetchData();
    }, []);

    const handleManValueChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const item = manufacturer.filter((it) => it.man_name === selectedValue)

        setManValue(selectedValue)
        // setManID(item[0].man_id);
        console.log(manValue)
    }

    //make
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${selectedManufacturer[manID]}`);
            const jsonData = await response.json();
            setCarMakes(jsonData.data);
        };
        fetchData();
    }, [selectedManufacturer, manID]);

    // const handleMakeValueChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedValue = event.target.value;
    //     setMakkeValue(selectedValue);
    // };

    //Category
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api2.myauto.ge/ka/cats/get');
            const jsonData = await response.json();
            setCategories(jsonData.data);
        };
        fetchData();
    }, []);

    //product
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api2.myauto.ge/ka/products/');
            const jsonData = await response.json();
            setProducts(jsonData.data.items);
        };
        fetchData();
    }, []);


    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSortOrder = parseInt(event.target.value);
        setSortOrder(selectedSortOrder as SortOrder);
        sortProducts(selectedSortOrder as SortOrder);
    };

    const sortProducts = (selectedSortOrder: SortOrder) => {
        let sortedProducts: any[];

        switch (selectedSortOrder) {
            case SortOrder.DecreasingDate:
                sortedProducts = [...products].sort((a, b) => {
                    const dateA = new Date(a.order_date);
                    const dateB = new Date(b.order_date);
                    return dateB.getTime() - dateA.getTime();
                });
                break;
            case SortOrder.IncreasingDate:
                sortedProducts = [...products].sort((a, b) => {
                    const dateA = new Date(a.order_date);
                    const dateB = new Date(b.order_date);
                    return dateA.getTime() - dateB.getTime();
                });
                break;
            case SortOrder.DecreasingPrice:
                sortedProducts = [...products].sort((a, b) => b.price - a.price);
                break;
            case SortOrder.IncreasingPrice:
                sortedProducts = [...products].sort((a, b) => a.price - b.price);
                break;
            case SortOrder.DecreasingMileage:
                sortedProducts = [...products].sort((a, b) => b.car_run_km - a.car_run_km);
                break;
            case SortOrder.IncreasingMileage:
                sortedProducts = [...products].sort((a, b) => a.car_run_km - b.car_run_km);
                break;
            default:
                sortedProducts = products;
                break;
        }

        setProducts(sortedProducts);
    };


    return (
        <div className='All'>
            <div className='filterContainer'>
                <div className='auto-logos'>
                    {/* <div className='car-logo-div'> */}

                    <button className='car-logo-btn' style={clickedCarTheme} onClick={() => setClickedCar(!clickedCar)}>
                        <svg width="24" height="24" viewBox="0 0 28 28" fill={carLogoFill} xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_473_27752)"><path className='car-logo-path' d="M7.79069 4.66675C6.84001 4.66675 5.97549 5.25115 5.6237 6.13648L3.78483 10.7302L2.39485 11.1951C0.968812 11.6698 0 13.0128 0 14.5151V21.0001C7e-05 21.6444 0.522363 22.1667 1.16667 22.1668H3.91472C4.57602 23.538 5.96966 24.5001 7.58334 24.5001C9.19701 24.5001 10.5907 23.538 11.252 22.1668H15.5814C16.2427 23.538 17.6363 24.5001 19.25 24.5001C20.8637 24.5001 22.2573 23.538 22.9186 22.1668H26.8333C27.4776 22.1667 27.9999 21.6444 28 21.0001V14.7475C28 13.0864 26.8151 11.6417 25.1859 11.3158L21.6449 10.6072L17.9443 5.98153C17.2808 5.14991 16.274 4.66676 15.2122 4.66676L7.79069 4.66675ZM7.79069 7.00008H10.5V10.5001H6.38932L7.79069 7.00008ZM12.8333 7.00008H15.2122C15.5668 7.00008 15.9006 7.16087 16.1214 7.43758L18.571 10.5001H12.8333V7.00008ZM4.8558 12.8334H20.8861L24.7279 13.6036C25.2803 13.7141 25.6667 14.1849 25.6667 14.7475V19.8334H23.2741C22.9855 17.8671 21.2916 16.3334 19.25 16.3334C17.2084 16.3334 15.5145 17.8671 15.2259 19.8334H11.6074C11.3188 17.8671 9.62492 16.3334 7.58334 16.3334C5.54175 16.3334 3.84788 17.8671 3.55924 19.8334H2.33333V14.5151C2.33333 14.0083 2.65057 13.5676 3.13086 13.4077L4.8558 12.8334ZM7.58334 18.6668C8.56365 18.6668 9.33334 19.4364 9.33334 20.4168C9.33334 21.3971 8.56365 22.1668 7.58334 22.1668C6.60302 22.1668 5.83333 21.3971 5.83333 20.4168C5.83333 19.4364 6.60302 18.6668 7.58334 18.6668ZM19.25 18.6668C20.2303 18.6668 21 19.4364 21 20.4168C21 21.3971 20.2303 22.1668 19.25 22.1668C18.2697 22.1668 17.5 21.3971 17.5 20.4168C17.5 19.4364 18.2697 18.6668 19.25 18.6668Z" fill="#7D7F87"></path></g><defs><clipPath id="clip0_473_27752"><rect width="28" height="28" fill="white"></rect></clipPath></defs></svg>
                    </button>

                    {/* </div> */}
                    {/* <div className='trac-logo-div'> */}
                    <button className='trac-logo-btn'>
                        <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_473_27762)"><path d="M5.83342 4.66675C5.18911 4.66682 4.66682 5.18911 4.66675 5.83341V13.5444C2.59415 14.6111 1.16675 16.7694 1.16675 19.2501C1.16675 22.7801 4.05341 25.6668 7.58342 25.6668C10.5064 25.6668 12.9823 23.685 13.7494 21.0001H18.726C18.6978 21.1925 18.6668 21.3837 18.6668 21.5834C18.6668 23.8248 20.5088 25.6668 22.7501 25.6668C24.9914 25.6668 26.8334 23.8248 26.8334 21.5834C26.8334 19.9698 25.8713 18.5761 24.5001 17.9148V15.1668V11.6668C24.5 11.0225 23.9777 10.5002 23.3334 10.5001H19.8334V7.00009H22.1668V4.66676H19.8334C18.5582 4.66676 17.5001 5.72486 17.5001 7.00009V10.5001H14.7908L12.7491 5.40049C12.5721 4.95773 12.1436 4.6672 11.6668 4.66676L5.83342 4.66675ZM7.00008 7.00008H10.8761L12.9177 12.0997C13.0947 12.5424 13.5233 12.833 14.0001 12.8334H22.1668V15.1667V17.5593C21.297 17.687 20.5103 18.0795 19.9063 18.669C19.8821 18.6675 19.8577 18.6667 19.8334 18.6667H13.9705C13.6732 15.4078 10.9166 12.8334 7.58342 12.8334C7.38664 12.8334 7.19248 12.8455 7.00008 12.863V7.00008ZM7.58342 15.1667C9.8524 15.1667 11.6668 16.9811 11.6668 19.2501C11.6668 21.5191 9.8524 23.3334 7.58342 23.3334C5.31444 23.3334 3.50008 21.5191 3.50008 19.2501C3.50008 16.9811 5.31444 15.1667 7.58342 15.1667ZM7.58342 17.5001C6.61691 17.5001 5.83342 18.2836 5.83342 19.2501C5.83342 20.2166 6.61691 21.0001 7.58342 21.0001C8.54992 21.0001 9.33342 20.2166 9.33342 19.2501C9.33342 18.2836 8.54992 17.5001 7.58342 17.5001ZM22.7501 19.8334C23.7304 19.8334 24.5001 20.6031 24.5001 21.5834C24.5001 22.5637 23.7304 23.3334 22.7501 23.3334C21.7698 23.3334 21.0001 22.5637 21.0001 21.5834C21.0001 20.6031 21.7698 19.8334 22.7501 19.8334Z" fill="#7D7F87"></path></g><defs><clipPath id="clip0_473_27762"><rect width="28" height="28" fill="white"></rect></clipPath></defs></svg>
                    </button>
                    {/* </div> */}
                    {/* <div className='moto-logo-div'> */}
                    <button className='moto-logo-btn'>
                        <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_475_27802" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28" style={{ maskType: 'alpha' }}><rect width="28" height="28" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_475_27802)"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.023 18.8527C13.0242 18.2669 12.9911 17.6068 12.8247 17.0002L12.8227 16.9929C11.9708 13.9705 9.22861 12.0964 6.20706 12.0421C6.16642 12.0414 6.04489 12.0195 5.83631 11.8625C5.63256 11.7091 5.41899 11.4817 5.21454 11.2148C5.01414 10.9532 4.84713 10.6862 4.72918 10.4815C4.67088 10.3804 4.62621 10.2972 4.59705 10.2413C4.5825 10.2134 4.57191 10.1925 4.56551 10.1797L4.55927 10.1672C4.54186 10.131 4.52229 10.0954 4.50105 10.0614C4.27359 9.69692 4.12258 9.41137 4.02537 9.19374C4.2449 9.23207 4.5118 9.2975 4.82349 9.39146C5.74001 9.66773 6.82816 10.1223 7.83944 10.552C7.90006 10.5777 7.96049 10.6034 8.0206 10.629C8.45007 10.8117 8.86353 10.9875 9.22027 11.1297C9.60259 11.2822 10.0121 11.4345 10.3351 11.4978C12.1264 11.8489 13.4167 10.9609 14.3329 10.3305C14.3513 10.3178 14.3696 10.3052 14.3877 10.2927C15.3865 9.60614 16.0192 9.20348 16.9149 9.31607C17.7669 9.42581 18.4479 9.81387 18.9901 10.1228C19.0763 10.172 19.159 10.2191 19.2384 10.2628C19.3086 10.3015 19.3937 10.3467 19.481 10.3859C19.5519 10.4177 19.7053 10.4836 19.8936 10.5099C20.0636 10.5337 20.5823 10.5622 20.9601 10.1029C21.2778 9.71655 21.2268 9.28546 21.2136 9.18293C21.1795 8.91681 21.0594 8.64463 20.9811 8.47211C20.8825 8.25504 20.7454 7.98067 20.575 7.64902C20.5463 7.59327 20.4979 7.46292 20.4623 7.26697C20.428 7.07834 20.4138 6.87281 20.425 6.68372C20.4312 6.57951 20.4443 6.4934 20.4599 6.42521C20.4926 6.4394 20.5291 6.45628 20.5694 6.47631C20.8998 6.64064 21.3157 6.92849 21.7693 7.29367C22.6115 7.97177 23.4218 8.78273 23.8085 9.16971C23.8342 9.19535 23.8579 9.21912 23.8797 9.24088L23.8848 9.246C24.1743 9.53129 24.4039 9.8902 24.5401 10.2745C24.726 10.9085 24.7052 11.2712 24.6561 11.4598C24.614 11.621 24.5358 11.7219 24.4003 11.8141C24.2388 11.9239 23.9944 12.0181 23.6532 12.0914C23.3548 12.1556 23.0533 12.1906 22.7323 12.2279C22.6854 12.2334 22.6382 12.2389 22.5904 12.2445C19.9226 12.5597 17.7623 14.2524 16.9731 16.76L16.9708 16.7675C16.7743 17.4078 16.6814 18.1658 16.6883 18.8935C16.2533 18.8999 15.7263 18.8973 15.1731 18.8903C14.6637 18.8839 14.1251 18.8736 13.6264 18.864C13.4165 18.86 13.2137 18.8561 13.023 18.8527ZM17.5699 18.8506C17.5846 18.848 17.5813 18.8476 17.5649 18.8514C17.567 18.8511 17.5699 18.8506 17.5699 18.8506ZM20.2494 6.35572L20.2524 6.35604L20.2494 6.35572ZM3.53215 9.15938L3.53383 9.159L3.53215 9.15938ZM2.60599 11.18C2.61674 11.2013 2.63029 11.2278 2.64654 11.2589C2.688 11.3384 2.74741 11.4487 2.82296 11.5799C2.9727 11.8397 3.1924 12.1928 3.46809 12.5526C3.73974 12.9072 4.09164 13.3028 4.5131 13.6201C4.92952 13.9336 5.49357 14.23 6.16753 14.2418M2.60599 11.18C2.16859 10.4732 1.86111 9.83639 1.73623 9.27388C1.60746 8.69389 1.63027 7.92383 2.26195 7.39193C2.78916 6.94801 3.46618 6.9311 3.90296 6.963C4.39488 6.99893 4.93573 7.12751 5.45843 7.28507C6.50937 7.60186 7.70805 8.10581 8.69974 8.52716C8.76135 8.55334 8.82211 8.57918 8.88199 8.60464C9.31562 8.78905 9.70338 8.95394 10.035 9.08618C10.4369 9.24638 10.6651 9.32066 10.7581 9.33888C11.5721 9.49839 12.1516 9.16025 13.1415 8.4798C13.1743 8.45725 13.2076 8.43427 13.2414 8.41094C14.1459 7.78708 15.4178 6.90979 17.1913 7.13351L17.1938 7.13382C17.5692 7.18204 17.9252 7.267 18.2545 7.37087C18.2221 7.09711 18.2131 6.81912 18.2288 6.55364C18.2672 5.90629 18.4932 4.8102 19.4925 4.32876C19.9047 4.12769 20.3237 4.13418 20.6448 4.19114C20.9692 4.2487 21.2783 4.37184 21.5489 4.50641C22.0901 4.77553 22.6504 5.17865 23.149 5.58007C24.0888 6.33679 24.9763 7.22558 25.3605 7.61036C25.3866 7.63654 25.4104 7.66038 25.4318 7.68169C25.9642 8.2072 26.3806 8.86295 26.6273 9.57841C26.6324 9.59312 26.6372 9.60794 26.6416 9.62285C26.9047 10.5058 26.9695 11.3066 26.785 12.0146C26.5927 12.7523 26.1584 13.279 25.6372 13.6334C25.142 13.9701 24.5854 14.1413 24.1155 14.2423C23.7051 14.3305 23.2901 14.3783 22.9766 14.4144C22.9317 14.4196 22.889 14.4245 22.8486 14.4293C20.9801 14.6501 19.5848 15.7952 19.0729 17.4165C18.8744 18.0666 18.8324 19.0086 18.9628 19.6945C19.0533 20.1704 18.8218 20.6495 18.3927 20.8744C18.2089 20.9707 18.025 21.0041 17.9582 21.016C17.8594 21.0338 17.7554 21.0456 17.6581 21.0543C17.4616 21.0718 17.2229 21.0822 16.9674 21.0885C16.453 21.1011 15.8031 21.0984 15.1454 21.0901C14.5789 21.083 14.0131 21.072 13.508 21.0622C12.809 21.0487 12.2263 21.0374 11.9195 21.0416C11.6251 21.0458 11.3413 20.9317 11.1317 20.725C10.9221 20.5183 10.8041 20.2362 10.8041 19.9418C10.8041 19.6831 10.8091 19.4471 10.8137 19.2281C10.8276 18.5769 10.8382 18.0774 10.7041 17.5859C10.1397 15.5901 8.31442 14.2804 6.16753 14.2418" fill="#7D7F87"></path><path d="M5.32409 15.4533C4.27136 15.6123 3.24152 16.2655 2.66366 17.1401C2.13157 17.941 1.96565 18.5317 2.0057 19.5484C2.04575 20.6786 2.3547 21.3659 3.16714 22.1781C4.72335 23.7287 7.24647 23.7173 8.80269 22.1497C9.24895 21.6953 9.55218 21.2012 9.75815 20.5878C9.88974 20.1959 9.91263 19.6189 9.91263 19.395C9.91263 19.1344 9.89547 18.5885 9.78676 18.2307C9.3691 16.9016 8.30493 15.8736 6.99473 15.5385C6.54275 15.4249 5.77608 15.3851 5.32409 15.4533ZM6.70866 17.7706C6.86314 17.8501 7.092 18.0091 7.21787 18.1341C8.36786 19.2757 7.46389 21.2296 5.8333 21.116C4.443 21.0137 3.69923 19.4234 4.52882 18.3329C4.73479 18.0659 5.1639 17.7479 5.44996 17.6627C5.76464 17.5661 6.39971 17.6229 6.70866 17.7706Z" fill="#7D7F87"></path><path d="M23.4551 15.4648C21.5285 15.7433 20.0879 17.4201 20.0879 19.3811C20.0879 21.1886 21.2941 22.7517 23.0607 23.2292C23.6438 23.3884 24.6728 23.3599 25.2445 23.178C25.9191 22.9564 26.4107 22.6551 26.891 22.172C27.3769 21.6775 27.6342 21.2796 27.8514 20.6771C27.9886 20.2962 28 19.6278 28 19.3811C28 19.1344 28 18.483 27.8228 18.0283C27.1254 16.2208 25.3646 15.1863 23.4551 15.4648ZM24.6842 17.7327C25.0959 17.8862 25.4789 18.2329 25.6733 18.6308C25.9019 19.0912 25.9019 19.671 25.6733 20.1314C25.3817 20.7282 24.8386 21.0863 24.1754 21.1318C23.4265 21.1773 22.8206 20.8192 22.4833 20.1428C21.7801 18.7274 23.1921 17.1814 24.6842 17.7327Z" fill="#7D7F87"></path></g></svg>
                    </button>
                    {/* </div> */}
                </div>


                <div className='filter'>
                    <label>გარიგების ტიპი</label>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value='' disabled selected hidden>გარიგების ტიპი</option>

                        <option value='1'>For sale</option>

                        <option value='0'>For rent</option>
                    </select>
                    <label>მწარმოებელი</label>
                    <div style={{
                        // height: '40px',

                    }}>
                        <Select
                            menuPosition="fixed"
                            menuPlacement="auto"
                            isMulti
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    // overflow: 'hidden',
                                    // textOverflow: 'clip',
                                    // maxWidth: "90%",
                                    // whiteSpace: "nowrap",
                                    overflow: "clip",
                                    maxHeight: '50px'
                                    // display: "initial"
                                }),
                            }}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: '#fd4100',
                                },
                            })}
                            placeholder='ყველა მწარმოებელი'
                            options={manufacturer && manufacturer.map((item) => ({
                                value: item.man_id,
                                label: item.man_name,
                            }))}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            onChange={(selectedOptions, context) => {
                                setSelectedManufacturer(
                                    selectedOptions ? selectedOptions.map((option) => option.value) : []
                                )
                                if (context.action === 'remove-value' || context.action === "deselect-option") {
                                    setManID((prev) => prev = prev - 1)
                                } else if (context.action === "clear") {
                                    setManID(-1)
                                } else {
                                    setManID((prev) => prev = prev + 1)

                                }
                                console.log(selectedManufacturer)
                                console.log(manID)
                            }
                            }

                        />
                    </div>
                    <label>მოდელი</label>
                    <Select
                        components={{
                            IndicatorSeparator: () => null
                        }}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                fontSize: '13px',
                                cursor: 'pointer',
                                overflow: 'hidden',
                            }),
                        }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: '#fd4100',
                            },
                        })}
                        placeholder='ყველა მოდელი'

                        isMulti
                        options={carMakes && carMakes.map((item) => ({
                            value: item.model_id,
                            label: item.model_name,

                        }))}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        onChange={(selectedOptions) => {
                            console.log(selectedOptions)
                            setSelectedModel(
                                selectedOptions ? selectedOptions.map((option) => option.value) : []
                            )
                        }
                        }
                    />

                    <label>კატეგორია</label>
                    <Select
                        components={{
                            IndicatorSeparator: () => null
                        }}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                fontSize: '13px',
                                cursor: 'pointer',
                                overflow: 'hidden',
                            }),
                        }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: '#fd4100',
                            },
                        })}
                        placeholder='ყველა კატეგორია'

                        isMulti
                        options={categories && categories.map((item) => ({
                            value: item.category_id,
                            label: item.title
                        }))}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        onChange={(selectedOptions) =>
                            setSelectedCategory(
                                selectedOptions ? selectedOptions.map((option) => option.value) : []
                            )
                        }
                    />
                </div>

                <div className='priceContainer'>

                    <div className='price'>
                        <div className='priceTag'>
                            <p>ფასი</p>
                            <div className='currancy-btns'>
                                <button id='Lari' style={theme} onClick={() => setDark(!dark)}>₾</button>
                                <button id='Dolar' style={theme2} onClick={() => setDark(!dark)}>$</button>
                            </div>
                        </div>
                        <div className='price-input-holder'>
                            <input placeholder='დან'></input>
                            <p>-</p>
                            <input placeholder='მდე'></input>
                        </div>
                    </div>
                </div>

                <div className='searchContainer'>
                    <button id='search-btn'>ძებნა</button>
                </div>

            </div >
            <div className='cars'>
                <div>
                    <div className='Another-filter-container'>
                        <p> განცხადება</p>
                        <div>
                            <select className='period-select'>
                                <option disabled selected hidden>პერიოდი</option>
                                <option>1 საათი</option>
                                <option>2 საათი</option>
                                <option>3 საათი</option>
                                <option>1 დღე</option>
                                <option>2 დღე</option>
                                <option>3 დღე</option>
                                <option>1 კვირა</option>
                                <option>2 კვირა</option>
                                <option>3 კვირა</option>

                            </select>

                            <select className='sort-select' value={sortOrder.toString()} onChange={handleSort}>
                                <option value="1">თარიღი კლებადი</option>
                                <option value="2">თარიღი ზრდადი</option>
                                <option value="3">ფასი კლებადი</option>
                                <option value="4">ფასი ზრდადი</option>
                                <option value="5">გარბენი კლებადი</option>
                                <option value="6">გარბენი ზრდადი</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div>
                    {products && products.map((item) => {
                        const manuf = manufacturer.filter((man) => man.man_id == item.man_id)
                        let vol = ''
                        if (item.man_id <= 533 && manuf[0].is_car === '1') {
                            if (item.engine_volume % 1000 == 0) {
                                let volume = item.engine_volume / 1000
                                vol = `${volume}.0`
                            } else {
                                let volume = item.engine_volume / 1000
                                vol = `${volume}`
                            }

                            const wheel = item.right_wheel ? 'მარჯვენა' : 'მარცხენა'
                            const customs = item.customs_passed ? '✓ განბაჟებული' : 'განბაჟება'
                            const theme = item.customs_passed ? { color: '#26b753' } : { color: '#ff3b30' }

                            // const model = carMakes2.filter((model) => model.model_id == item.model_id)
                            return < div className='car-container' >
                                <section>
                                    <img src={`https://static.my.ge/myauto/photos/${item.photo}/thumbs/${item.car_id}_1.jpg?v=${item.photo_ver}`} alt='carImg' />
                                </section>
                                <div className='info'>
                                    <div className='title'>
                                        <div style={{ display: 'flex' }}>
                                            <p className='name'>{manuf && manuf[0].man_name} {item.car_model}</p>
                                            <p className='year'>{item.prod_year} წ</p>
                                        </div>
                                        <div>
                                            <p className='customs' style={theme}>{customs}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                                            <div style={{ fontFamily: 'TBCXRegular', fontSize: '13px', marginRight: '18.5%', color: '#272a37', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span style={{ marginRight: '12px' }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.525 2c-.388 0-.703.35-.703.783 0 .433.315.783.703.783h1.808v1.707H5.686a.662.662 0 0 0-.465.19L4.004 6.665h-.667a.654.654 0 0 0-.658.65v1.23H1.5V7.134a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v4.95c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77v-1.998H2.68v1.871c0 .36.294.65.658.65h.667l1.217 1.203c.124.121.29.19.465.19h5.17c.142 0 .28-.046.395-.13l1.88-1.393a.648.648 0 0 0 .263-.52v-1.871H14.5v1.998c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77v-4.95a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v1.411h-1.106v-1.23a.646.646 0 0 0-.193-.46l-1.41-1.392a.662.662 0 0 0-.465-.19H8.74V3.566h1.807c.389 0 .704-.35.704-.783 0-.432-.315-.783-.704-.783H5.525zm-.783 5.775 1.217-1.202h5.094l1.025 1.011v4.049L10.637 12.7H5.959l-1.217-1.202a.662.662 0 0 0-.465-.19h-.282V7.964h.282a.662.662 0 0 0 .465-.19z" fill="#9CA2AA"></path></svg></span>
                                                {vol} ბენზინი</div>
                                            <div ><div style={{ fontFamily: 'TBCXRegular', fontSize: '13px', color: '#272a37', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span style={{ marginRight: '12px' }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.3" stroke="#9CA2AA" stroke-width="1.4"></circle><circle cx="8" cy="8" r="1.3" stroke="#9CA2AA" stroke-width="1.4"></circle><path d="M12 8a4 4 0 0 0-8 0" stroke="#9CA2AA" stroke-width="1.4" stroke-linecap="round"></path><path d="m9 7 1.5-1.5" stroke="#9CA2AA" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                                                {item.car_run_km} კმ</div></div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ fontFamily: 'TBCXRegular', fontSize: '13px', marginRight: '22.5%', color: '#272a37', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span style={{ marginRight: '12px' }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.6" y="7.6" width="10.8" height="7.8" rx="1.2" stroke="#8C929B" stroke-width="1.2"></rect><path d="M8 5v5" stroke="#8C929B" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 12v1.5" stroke="#8C929B" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="8" cy="2.5" r="1.8" stroke="#8C929B" stroke-width="1.4"></circle><path d="M5 10v3M11 10v3" stroke="#8C929B" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                                                მექანიკა</div>
                                            <div ><div style={{ fontFamily: 'TBCXRegular', fontSize: '13px', color: '#272a37', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span style={{ marginRight: '12px' }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.3" stroke="#9CA2AA" stroke-width="1.4"></circle><circle cx="8" cy="8" r="1.3" stroke="#9CA2AA" stroke-width="1.4"></circle><path d="m9.5 8 4-1.5M6.214 8 2 7.299M8 9.5V14" stroke="#9CA2AA" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                                                {wheel}</div></div>
                                        </div>
                                    </div>
                                    <div className='lowest-container'>
                                        <p className='views'>{item.views} ნახვა . წუთის წინ</p>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <svg className='msg' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.91675 7C4.91675 6.58579 5.25253 6.25 5.66675 6.25H10.3334C10.7476 6.25 11.0834 6.58579 11.0834 7C11.0834 7.41421 10.7476 7.75 10.3334 7.75H5.66675C5.25253 7.75 4.91675 7.41421 4.91675 7Z" fill="#6F7383"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M1.71959 2.00645C2.46251 1.26354 3.49615 0.870117 4.66658 0.870117H11.3333C12.5037 0.870117 13.5373 1.26354 14.2802 2.00645C15.0232 2.74937 15.4166 3.78301 15.4166 4.95345V8.95345C15.4166 10.1239 15.0232 11.1575 14.2802 11.9004C13.7006 12.4801 12.9438 12.847 12.0833 12.9803V13.7068C12.0833 14.8428 10.8196 15.5073 9.88455 14.8846M9.8839 14.8842L7.10659 13.0368H4.66658C3.49615 13.0368 2.46251 12.6434 1.71959 11.9004C0.976671 11.1575 0.583252 10.1239 0.583252 8.95345V4.95345C0.583252 3.78301 0.976671 2.74937 1.71959 2.00645M2.78025 3.06711C2.3565 3.49086 2.08325 4.12389 2.08325 4.95345V8.95345C2.08325 9.78302 2.3565 10.416 2.78025 10.8398C3.204 11.2635 3.83702 11.5368 4.66658 11.5368H7.33325C7.48106 11.5368 7.62557 11.5805 7.74863 11.6623L10.5833 13.5478V12.2868C10.5833 11.8726 10.919 11.5368 11.3333 11.5368C12.1628 11.5368 12.7958 11.2635 13.2196 10.8398C13.6433 10.416 13.9166 9.78302 13.9166 8.95345V4.95345C13.9166 4.12389 13.6433 3.49086 13.2196 3.06711C12.7958 2.64336 12.1628 2.37012 11.3333 2.37012H4.66658C3.83702 2.37012 3.204 2.64336 2.78025 3.06711Z" fill="#6F7383"></path></svg>
                                            <svg className='eye' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1971 1.86358C15.49 1.57069 15.49 1.09582 15.1971 0.802922C14.9042 0.510029 14.4293 0.510029 14.1364 0.802922L11.9576 2.98172C10.763 2.1811 9.41024 1.73657 7.9999 1.73657C5.32859 1.73657 2.92164 3.31184 1.29406 5.8702C0.898865 6.48961 0.726562 7.26919 0.726562 8.00324C0.726562 8.73727 0.898856 9.51683 1.29403 10.1362L1.29406 5.8702L1.29437 10.1368C1.75821 10.8647 2.28833 11.5159 2.86715 12.0722L0.802922 14.1364C0.510029 14.4293 0.510029 14.9042 0.802922 15.1971C1.09582 15.49 1.57069 15.49 1.86358 15.1971L6.84358 10.2171L6.85167 10.2089L10.2089 6.85167C10.2116 6.849 10.2144 6.8463 10.2171 6.84358L15.1971 1.86358ZM9.62304 5.31632L10.8716 4.06773C9.96926 3.52124 8.9924 3.23657 7.9999 3.23657C5.96471 3.23657 3.98512 4.43444 2.55938 6.67578L2.55875 6.67677C2.35417 6.99728 2.22656 7.47748 2.22656 8.00324C2.22656 8.52899 2.35417 9.0092 2.55875 9.32971L2.5591 9.33025C2.96933 9.97416 3.43253 10.5386 3.92806 11.0113L5.31632 9.62304C5.029 9.1501 4.86328 8.59531 4.86328 7.99995C4.86328 6.26573 6.26573 4.86328 7.99995 4.86328C8.59531 4.86328 9.1501 5.029 9.62304 5.31632ZM6.36328 7.99995C6.36328 7.09416 7.09416 6.36328 7.99995 6.36328C8.17434 6.36328 8.34172 6.39024 8.49872 6.44051L6.44051 8.49872C6.39024 8.34172 6.36328 8.17434 6.36328 7.99995ZM12.8967 4.70224C13.2195 4.44263 13.6916 4.49382 13.9512 4.81658C14.2115 5.14023 14.4684 5.48942 14.7061 5.86379C15.1012 6.48316 15.2735 7.26267 15.2735 7.99665C15.2735 8.7307 15.1012 9.51028 14.706 10.1297C13.0784 12.6881 10.6715 14.2633 8.00014 14.2633C7.07361 14.2633 6.1683 14.0674 5.32243 13.7112C4.94068 13.5505 4.76151 13.1107 4.92225 12.7289C5.08299 12.3472 5.52276 12.168 5.90452 12.3288C6.57865 12.6126 7.28668 12.7633 8.00014 12.7633C10.0353 12.7633 12.0149 11.5654 13.4407 9.32411L13.4413 9.32312C13.6459 9.0026 13.7735 8.5224 13.7735 7.99665C13.7735 7.47089 13.6459 6.99069 13.4413 6.67017L13.4402 6.66852C13.238 6.34993 13.0152 6.04612 12.7824 5.75672C12.5228 5.43396 12.574 4.96185 12.8967 4.70224ZM11.0774 8.60269C11.1525 8.19534 10.8832 7.80423 10.4759 7.72912C10.0685 7.65401 9.6774 7.92333 9.60228 8.33068C9.48535 8.96483 8.95799 9.49219 8.32384 9.60912C7.9165 9.68423 7.64717 10.0753 7.72228 10.4827C7.7974 10.89 8.18851 11.1594 8.59585 11.0843C9.84171 10.8545 10.8477 9.84854 11.0774 8.60269Z" fill="#6F7383"></path></svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.68574 2.1679C8.51267 2.29346 8.3477 2.43458 8.19095 2.5894L8.0626 2.72088L8 2.78989L7.9374 2.72088L7.80905 2.5894C7.6523 2.43458 7.48733 2.29346 7.31426 2.1679C6.73288 1.74614 6.06008 1.5 5.3 1.5C2.58473 1.5 1 3.87655 1 6.304C1 8.67851 2.19139 10.7406 4.13701 12.4002C5.50533 13.5673 7.2954 14.5 8 14.5C8.705 14.5 10.495 13.5674 11.8633 12.4002C13.8088 10.7406 15 8.67852 15 6.304C15 3.87655 13.4153 1.5 10.7 1.5C9.93992 1.5 9.26711 1.74614 8.68574 2.1679ZM6.67538 3.71857C6.23895 3.2911 5.78989 3.1 5.3 3.1C3.75142 3.1 2.6 4.44771 2.6 6.304C2.6 8.08759 3.48098 9.73759 5.17536 11.1829C5.76665 11.6872 6.46051 12.1489 7.07374 12.4778C7.37967 12.6419 7.64224 12.7605 7.84224 12.8338C7.91231 12.8595 7.96436 12.8758 8.00009 12.886C8.03585 12.8758 8.08795 12.8595 8.1581 12.8338C8.35812 12.7605 8.62069 12.6419 8.92662 12.4778C9.53983 12.1489 10.2337 11.6873 10.825 11.1829C12.5191 9.73772 13.4 8.08768 13.4 6.304C13.4 4.44771 12.2486 3.1 10.7 3.1C10.2101 3.1 9.76105 3.29109 9.32462 3.71857L9.228 3.81755L8 5.17143L6.77199 3.81755L6.67538 3.71857Z" fill="#6F7383"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    })}
                </div>
            </div>
        </div >
    )

}
export default Cars
