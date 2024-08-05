import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useState, useEffect } from 'react';
import Form from '../components/Form';
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setDataSetx_axis, setDataSety_axis, setFormData, setSource } from '../features/Slice'
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const [chartType, setChartType] = useState("bar");
    const [showChart, setChartShow] = useState()
    const appStates = useSelector((state) => state.appStates)
    const dispatch = useDispatch()



    const fetchedData = useSelector((state) => state.appStates.fetchedData)
    const source = useSelector((state) => state.appStates.source)
    const formData = useSelector((state) => state.appStates.formData)

    const chartOptions = [
        { value: 'bar', label: 'Bar Chart' },
        { value: 'line', label: 'Line Chart' }
    ]
    const dataOptions = [
        { value: 'GetDataBySp', label: 'Stored Procedure' },
        { value: 'GetDataByFunction', label: 'Function' },
        { value: 'GetDataByView', label: 'View' },
    ]

    function fillDatasetOptions(fetchedData) {

        const dataSetx_axisList = [];
        const dataSety_axisList = [];

        fetchedData && fetchedData.map((item, index) => {
            dataSetx_axisList.push(item.x_axis);
            dataSety_axisList.push(item.y_axis);
        })
        dispatch(setDataSetx_axis(dataSetx_axisList))
        dispatch(setDataSety_axis(dataSety_axisList))

    }

    const notifyerrorDbConnection = () => toast.error('Please connect a DataBase before submit !', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"

    });



    function handleClick(source, chartType) {

        if (formData && formData.loginName !== "" ) {
            setChartShow(chartType)
            dispatch(fetchData({ formData, source }))
        }
        else {
            notifyerrorDbConnection()
        }

        console.log(formData)

    }


    useEffect(() => { fillDatasetOptions(fetchedData) }, [fetchedData])
    return (
        <div style={{ backgroundColor: "#7AA2E3" }}>
            <Form />
            <div className='container  p-2' style={{ backgroundColor: "#AAD7D9" }}>
                <div className='card-title m-0 p-2 fw-bolder fs-'>
                    Plot Graph
                </div>
                <div className=' col-12  justify-content-between d-flex '>
                    <div className='col-10 select-box d-flex gap-2'>
                        <Select className='col-5' defaultValue={chartOptions[0]} options={chartOptions} onChange={(choise) => setChartType(choise.value)} />
                        <Select className='col-5' defaultValue={dataOptions[0]} options={dataOptions} onChange={(choise) => dispatch(setSource(choise.value))} />
                    </div>
                    <div className='col-2'>
                        <button onClick={() => handleClick(source, chartType)} className='col-12 btn btn-success'>Submit</button>

                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />

            {
                // Yalnızca veri yüklendiğinde ve gerekli veriler mevcut olduğunda 
                appStates.loading ? (
                    <div className='container d-flex align-items-center justify-content-center ' style={{ height: "300px", backgroundColor: "#FBF9F1" }}>

                        <ReactLoading type={'spinningBubbles'} color='blue' height={300} />
                    </div>
                ) : appStates.error ? (
                    <div className='container d-flex align-items-center justify-content-center' style={{ height: "300px", backgroundColor: "#FBF9F1" }}>Something went wrong</div>
                ) : showChart ? (
                    <div className='container  d-flex justify-content-center' style={{ backgroundColor: "#FBF9F1" }}>
                        {showChart === "bar" ? (
                            <BarChart
                                xAxis={[
                                    {
                                        id: 'barCategories',
                                        data: appStates.dataSetx_axis,
                                        scaleType: 'band',
                                    },
                                ]}
                                series={[
                                    {
                                        data: appStates.dataSety_axis,
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        ) : (
                            <LineChart
                                xAxis={[{ data: appStates.dataSetx_axis }]}
                                series={[
                                    {
                                        data: appStates.dataSety_axis,
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        )}
                    </div>
                ) : (
                    // Eğer veri yüklenmemişse 

                    <div className='container  d-flex justify-content-center' style={{ backgroundColor: "#FBF9F1" }}>

                        {
                            chartType === "bar" ? <BarChart
                                xAxis={[
                                    {
                                        id: 'barCategories',
                                        data: [1, 2, 3],
                                        scaleType: 'band',
                                    },
                                ]}
                                series={[
                                    {
                                        data: [1, 2, 3],
                                    },
                                ]}
                                width={500}
                                height={300}
                                colors={['gray', 'gray', 'gray']}
                                className='opacity-25'
                            />
                                : <LineChart
                                    xAxis={[{ data: [1, 2, 3] }]}
                                    series={[
                                        {
                                            data: [1, 2, 3],
                                        },
                                    ]}
                                    width={500}
                                    height={300}
                                    colors={['gray', 'gray', 'gray']}
                                    className='opacity-25'
                                />
                        }

                    </div>



                )
            }



        </div>
    )
}

export default Home