import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import './Pagination.css';


function Pagination({ manufacturer, products, dark, setDark, searchQuery }: { manufacturer: any[], products: any[], dark: boolean, setDark: any, searchQuery: any }) {

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [productModels, setProductModels] = useState<any[]>([]);


    const theme = {
        backgroundColor: dark ? 'black' : 'white',
        color: dark ? 'white' : 'black',
        width: '24px',
        height: '24px',
        cursor: 'pointer',
    }

    const theme2 = {

        backgroundColor: dark ? 'white' : 'black',
        color: dark ? 'black' : 'white',
        width: '24px',
        height: '24px',
        cursor: 'pointer',
    }

    const filteredProducts = products.filter((item) => item.price_value >= searchQuery)


    useEffect(() => {
        const fetchData = async () => {
            const modelPromises = filteredProducts.map(async (item) => {
                const response = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${item.man_id}`);
                const jsonData = await response.json();
                return jsonData.data;
            });

            const fetchedModels = await Promise.all(modelPromises);
            setProductModels(fetchedModels);
        };

        fetchData();
    }, [products]);


    function handlePageClick({ selected: selectedPage }: { selected: any }) {
        setCurrentPage(selectedPage);
    }
    const PER_PAGE = 5;
    const offset = currentPage * PER_PAGE;
    const currentPageData = filteredProducts.slice(offset, offset + PER_PAGE)
        .map((item) => {
            const manuf = manufacturer.filter((man) => man.man_id == item.man_id)
            const model1 = productModels && productModels.map((make) => {
                const model2 = make.filter((model: any) => model.model_id === item.model_id)
                // console.log(model1)
                return model2
            })
            const model = model1.filter((m: any) => m.length !== 0)

            const actualModel = model.length > 0 && model[0][0]

            // console.log(model[0][0])
            let vol = ''
            if (item.man_id <= 533 && actualModel.is_car === true) {
                if (item.engine_volume % 1000 == 0) {
                    let volume = item.engine_volume / 1000
                    vol = `${volume}.0`
                } else {
                    let volume = item.engine_volume / 1000
                    vol = `${volume}`
                }



                const wheel = item.right_wheel ? 'მარჯვენა' : 'მარცხენა'
                const customs = item.customs_passed ? '✓ განბაჟებული' : 'განბაჟება'
                const customsTheme = item.customs_passed ? { color: '#26b753' } : { color: '#ff3b30' }
                const priceValue = dark ? item.price_value : item.price_usd
                const priceValueTheme = { fontFamily: 'TBCXMedium', fontSize: '20px', color: '#272a37', marginRight: '5px' }
                // const model = carMakes2.filter((model) => model.model_id == item.model_id)
                return < div className='car-container' >
                    <section>
                        <img src={`https://static.my.ge/myauto/photos/${item.photo}/thumbs/${item.car_id}_1.jpg?v=${item.photo_ver}`} alt='carImg' />
                    </section>
                    <div className='info'>
                        <div className='title'>
                            <div style={{ display: 'flex' }}>
                                <p className='name'>{manuf && manuf[0].man_name} {model && model[0][0].model_name} {item.car_model}</p>
                                <p className='year'>{item.prod_year} წ</p>
                            </div>
                            <div>
                                <p className='customs' style={customsTheme}>{customs}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '397.8px', height: '79px' }}>
                                <div style={{ display: 'flex', }}>
                                    <div style={{ width: '50%', padding: '10px 12px 10px 12px' }}>
                                        <div style={{ fontFamily: 'TBCXRegular', fontSize: '13px', color: '#272a37', display: 'flex', }}><span style={{ marginRight: '12px' }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.525 2c-.388 0-.703.35-.703.783 0 .433.315.783.703.783h1.808v1.707H5.686a.662.662 0 0 0-.465.19L4.004 6.665h-.667a.654.654 0 0 0-.658.65v1.23H1.5V7.134a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v4.95c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77v-1.998H2.68v1.871c0 .36.294.65.658.65h.667l1.217 1.203c.124.121.29.19.465.19h5.17c.142 0 .28-.046.395-.13l1.88-1.393a.648.648 0 0 0 .263-.52v-1.871H14.5v1.998c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77v-4.95a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v1.411h-1.106v-1.23a.646.646 0 0 0-.193-.46l-1.41-1.392a.662.662 0 0 0-.465-.19H8.74V3.566h1.807c.389 0 .704-.35.704-.783 0-.432-.315-.783-.704-.783H5.525zm-.783 5.775 1.217-1.202h5.094l1.025 1.011v4.049L10.637 12.7H5.959l-1.217-1.202a.662.662 0 0 0-.465-.19h-.282V7.964h.282a.662.662 0 0 0 .465-.19z" fill="#9CA2AA"></path></svg></span>
                                            {vol} ბენზინი</div>
                                    </div>
                                    <div style={{ width: '50%', padding: '10px 12px 10px 12px' }}>
                                        <div ><div style={{ fontFamily: 'TBCXRegular', fontSize: '13px', color: '#272a37', display: 'flex', }}><span style={{ marginRight: '12px' }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.3" stroke="#9CA2AA" stroke-width="1.4"></circle><circle cx="8" cy="8" r="1.3" stroke="#9CA2AA" stroke-width="1.4"></circle><path d="M12 8a4 4 0 0 0-8 0" stroke="#9CA2AA" stroke-width="1.4" stroke-linecap="round"></path><path d="m9 7 1.5-1.5" stroke="#9CA2AA" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                                            {item.car_run_km} კმ</div></div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50%', padding: '10px 12px 10px 12px' }}>
                                        <div style={{ fontFamily: 'TBCXRegular', fontSize: '13px', color: '#272a37', display: 'flex', }}><span style={{ marginRight: '12px' }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.6" y="7.6" width="10.8" height="7.8" rx="1.2" stroke="#8C929B" stroke-width="1.2"></rect><path d="M8 5v5" stroke="#8C929B" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 12v1.5" stroke="#8C929B" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="8" cy="2.5" r="1.8" stroke="#8C929B" stroke-width="1.4"></circle><path d="M5 10v3M11 10v3" stroke="#8C929B" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                                            მექანიკა</div>
                                    </div>
                                    <div style={{ width: '50%', padding: '10px 12px 10px 12px' }}>
                                        <div ><div style={{ fontFamily: 'TBCXRegular', fontSize: '13px', color: '#272a37', display: 'flex', }}><span style={{ marginRight: '12px' }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.3" stroke="#9CA2AA" stroke-width="1.4"></circle><circle cx="8" cy="8" r="1.3" stroke="#9CA2AA" stroke-width="1.4"></circle><path d="m9.5 8 4-1.5M6.214 8 2 7.299M8 9.5V14" stroke="#9CA2AA" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                                            {wheel}</div></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <p style={priceValueTheme}>{priceValue}</p>
                                <div className='currancy-btns'>
                                    <button className='Lari' style={theme} onClick={() => setDark(!dark)}>₾</button>
                                    <button className='Dolar' style={theme2} onClick={() => setDark(!dark)}>$</button>
                                </div>

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
        })


    const pageCount = Math.ceil(products.length / PER_PAGE);



    return (
        <div>
            {currentPageData}
            <div style={{ marginBottom: '20px', width: '780px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: '5px' }}>

                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />

            </div>
        </div>
    )
}

export default Pagination
