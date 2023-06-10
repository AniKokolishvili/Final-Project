import React from 'react'
import { useEffect, useState } from 'react'
import './index.css';


function CarList() {
    const [products, setProducts] = useState<any[]>([]);

    const [cars, setCars] = useState<Car[]>([]);

    interface Car {
        order_date: string;
        price: number;
        car_run_km: number;
    }

    //setCars
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api2.myauto.ge/ka/products/');
            const jsonData = await response.json();
            setProducts(jsonData.data.items);
        };
        fetchData();
    }, []);

    const sortByDecreasingDate = () => {
        const sortedCars = [...cars].sort((a, b) =>
            new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
        );
        setCars(sortedCars);
    };

    const sortByIncreasingDate = () => {
        const sortedCars = [...cars].sort((a, b) =>
            new Date(a.order_date).getTime() - new Date(b.order_date).getTime()
        );
        setCars(sortedCars);
    };

    const sortByDecreasingPrice = () => {
        const sortedCars = [...cars].sort((a, b) => b.price - a.price);
        setCars(sortedCars);
    };

    const sortByIncreasingPrice = () => {
        const sortedCars = [...cars].sort((a, b) => a.price - b.price);
        setCars(sortedCars);
    };

    const sortByDecreasingMileage = () => {
        const sortedCars = [...cars].sort((a, b) => b.car_run_km - a.car_run_km);
        setCars(sortedCars);
    };

    const sortByIncreasingMileage = () => {
        const sortedCars = [...cars].sort((a, b) => a.car_run_km - b.car_run_km);
        setCars(sortedCars);
    };


    //product
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api2.myauto.ge/ka/products/');
            const jsonData = await response.json();
            setProducts(jsonData.products);
        };
        fetchData();
    }, []);

    // let productModels: any[] //MutableRefObject<any[]>[];
    // useEffect(() => {

    //     productModels = products.map((item) => {
    //         // return { man_id: item.man_id, model_id: item.model_id }
    //         // let carModel1: any[]
    //         const fetchData = async () => {
    //             const response = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${item.man_id}`);
    //             const jsonData = await response.json();
    //             setCarModel(jsonData.data)
    //             // console.log(carModel)
    //             return carModel
    //         };

    //         return fetchData()

    //     })




    // }, [])

    // useEffect(() => {
    //     //     setCarModels(productModels)
    //     console.log(productModels)
    //     //     console.log(carModels)
    // }, [])

    return (
        <div >
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

                    <select className='sort-select'>
                        <option>თარიღი კლებადი</option>
                        <option>თარიღი ზრდადი</option>
                        <option>ფასი კლებადი</option>
                        <option onClick={() => sortByDecreasingPrice}>ფასი ზრდადი</option>
                        <option>გარბენი კლებადი</option>
                        <option>გარბენი კლებადი</option>
                    </select>
                </div>
            </div>


        </div >
    )
}

export default CarList
