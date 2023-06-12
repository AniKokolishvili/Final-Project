import React, { useState } from 'react'
import './Sort.css'

function Sort({ products, setProducts, carCount }: { products: any[], setProducts: any, carCount: number }) {
    enum SortOrder {
        DecreasingDate = 1,
        IncreasingDate = 2,
        DecreasingPrice = 3,
        IncreasingPrice = 4,
        DecreasingMileage = 5,
        IncreasingMileage = 6,
    }

    enum PeriodOrder {
        H1 = 1,
        H2 = 2,
        H3 = 3,
        D1 = 4,
        D2 = 5,
        D3 = 6,
        W1 = 7,
        W2 = 8,
        W3 = 9,
        Period = 10,

    }

    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DecreasingDate);
    const [periodOrder, setPeriodOrder] = useState<PeriodOrder>(PeriodOrder.Period);

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
    const handlePeriod = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPeriod = parseInt(event.target.value);
        setPeriodOrder(selectedPeriod as PeriodOrder);
        sortProductsByPeriod(selectedPeriod as PeriodOrder);
    };

    const sortProductsByPeriod = (selectedPeriod: PeriodOrder) => {
        let sortedProducts: any[] = products;
        const date = new Date()

        switch (selectedPeriod) {
            case PeriodOrder.H1:
                sortedProducts = [...products].filter((a) => {
                    const splitA: string[] = a.order_date.split(" ")
                    const dateStringA1: string[] = splitA[0].split("-")
                    const dateStringA2: string[] = splitA[1].split(":")
                    const dateA: Date = new Date(parseInt(dateStringA1[0]), parseInt(dateStringA1[1]), parseInt(dateStringA1[2]), parseInt(dateStringA2[0]), parseInt(dateStringA2[1]), parseInt(dateStringA2[2]))
                    return Math.abs(dateA.getHours() - date.getHours()) <= 1 && dateA.getMonth() === date.getMonth() + 1 && dateA.getDate() === date.getDate() && dateA.getFullYear() === date.getFullYear()

                })
                break;
            case PeriodOrder.H2:
                sortedProducts = [...products].filter((a) => {
                    const splitA: string[] = a.order_date.split(" ")
                    const dateStringA1: string[] = splitA[0].split("-")
                    const dateStringA2: string[] = splitA[1].split(":")
                    const dateA: Date = new Date(parseInt(dateStringA1[0]), parseInt(dateStringA1[1]), parseInt(dateStringA1[2]), parseInt(dateStringA2[0]), parseInt(dateStringA2[1]), parseInt(dateStringA2[2]))

                    return Math.abs(dateA.getHours() - date.getHours()) <= 2 && dateA.getMonth() === date.getMonth() + 1 && dateA.getDate() === date.getDate() && dateA.getFullYear() === date.getFullYear()

                })
                break;
            case PeriodOrder.H3:
                sortedProducts = [...products].filter((a) => {
                    const splitA: string[] = a.order_date.split(" ")
                    const dateStringA1: string[] = splitA[0].split("-")
                    const dateStringA2: string[] = splitA[1].split(":")
                    const dateA: Date = new Date(parseInt(dateStringA1[0]), parseInt(dateStringA1[1]), parseInt(dateStringA1[2]), parseInt(dateStringA2[0]), parseInt(dateStringA2[1]), parseInt(dateStringA2[2]))

                    return Math.abs(dateA.getHours() - date.getHours()) <= 3 && dateA.getMonth() === date.getMonth() + 1 && dateA.getDate() === date.getDate() && dateA.getFullYear() === date.getFullYear()

                })
                break;
            case PeriodOrder.D1:
                sortedProducts = [...products].filter((a) => {
                    const splitA: string[] = a.order_date.split(" ")
                    const dateStringA1: string[] = splitA[0].split("-")
                    const dateStringA2: string[] = splitA[1].split(":")
                    const dateA: Date = new Date(parseInt(dateStringA1[0]), parseInt(dateStringA1[1]), parseInt(dateStringA1[2]), parseInt(dateStringA2[0]), parseInt(dateStringA2[1]), parseInt(dateStringA2[2]))
                    return Math.abs(dateA.getDate() - date.getDate()) <= 1 && dateA.getMonth() === date.getMonth() + 1

                })
                break;
            case PeriodOrder.D2:
                sortedProducts = [...products].filter((a) => {
                    const splitA: string[] = a.order_date.split(" ")
                    const dateStringA1: string[] = splitA[0].split("-")
                    const dateStringA2: string[] = splitA[1].split(":")
                    const dateA: Date = new Date(parseInt(dateStringA1[0]), parseInt(dateStringA1[1]), parseInt(dateStringA1[2]), parseInt(dateStringA2[0]), parseInt(dateStringA2[1]), parseInt(dateStringA2[2]))

                    return Math.abs(dateA.getDate() - date.getDate()) <= 2 && dateA.getMonth() == date.getMonth() + 1

                })
                break;
            case PeriodOrder.D3:
                sortedProducts = [...products].filter((a) => {
                    const splitA: string[] = a.order_date.split(" ")
                    const dateStringA1: string[] = splitA[0].split("-")
                    const dateStringA2: string[] = splitA[1].split(":")
                    const dateA: Date = new Date(parseInt(dateStringA1[0]), parseInt(dateStringA1[1]), parseInt(dateStringA1[2]), parseInt(dateStringA2[0]), parseInt(dateStringA2[1]), parseInt(dateStringA2[2]))
                    return Math.abs(dateA.getDate() - date.getDate()) <= 3 && dateA.getMonth() == date.getMonth() + 1

                })
                break;
            case PeriodOrder.W1:
                sortedProducts = [...products].filter((a) => {
                    const splitA: string[] = a.order_date.split(" ")
                    const dateStringA1: string[] = splitA[0].split("-")
                    const dateStringA2: string[] = splitA[1].split(":")
                    const dateA: Date = new Date(parseInt(dateStringA1[0]), parseInt(dateStringA1[1]), parseInt(dateStringA1[2]), parseInt(dateStringA2[0]), parseInt(dateStringA2[1]), parseInt(dateStringA2[2]))
                    return Math.abs(dateA.getDate() - date.getDate()) <= 7 && dateA.getMonth() == date.getMonth() + 1

                })

                break;
            case PeriodOrder.W2:
                sortedProducts = [...products].filter((a) => {
                    const splitA: string[] = a.order_date.split(" ")
                    const dateStringA1: string[] = splitA[0].split("-")
                    const dateStringA2: string[] = splitA[1].split(":")
                    const dateA: Date = new Date(parseInt(dateStringA1[0]), parseInt(dateStringA1[1]), parseInt(dateStringA1[2]), parseInt(dateStringA2[0]), parseInt(dateStringA2[1]), parseInt(dateStringA2[2]))
                    return Math.abs(dateA.getDate() - date.getDate()) <= 14 && dateA.getMonth() == date.getMonth() + 1

                })
                break;
            case PeriodOrder.W2:
                sortedProducts = [...products].filter((a) => {
                    const splitA: string[] = a.order_date.split(" ")
                    const dateStringA1: string[] = splitA[0].split("-")
                    const dateStringA2: string[] = splitA[1].split(":")
                    const dateA: Date = new Date(parseInt(dateStringA1[0]), parseInt(dateStringA1[1]), parseInt(dateStringA1[2]), parseInt(dateStringA2[0]), parseInt(dateStringA2[1]), parseInt(dateStringA2[2]))
                    return Math.abs(dateA.getDate() - date.getDate()) <= 28 && dateA.getMonth() == date.getMonth() + 1

                })

                break;
            case PeriodOrder.Period:
                sortedProducts = products;
                break;
            default:
                sortedProducts = products;
                break;
        }

        setProducts(sortedProducts);
    };


    return (
        <div className='Another-filter-container'>
            <p>{carCount} განცხადება</p>
            <div>
                <select className='period-select' value={periodOrder.toString()} onChange={handlePeriod}>
                    <option value='10' disabled selected hidden>პერიოდი</option>
                    <option value='1'>1 საათი</option>
                    <option value='2'>2 საათი</option>
                    <option value='3'>3 საათი</option>
                    <option value='4'>1 დღე</option>
                    <option value='5'>2 დღე</option>
                    <option value='6'>3 დღე</option>
                    <option value='7'>1 კვირა</option>
                    <option value='8'>2 კვირა</option>
                    <option value='9'>3 კვირა</option>

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
    )
}

export default Sort
