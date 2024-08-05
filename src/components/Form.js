import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { setFormData, setPassword, setServerName, setLoginName } from '../features/Slice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const Form = () => {

    const dispatch = useDispatch()
    const serverName = useSelector((state) => state.appStates.serverName)
    const loginName = useSelector((state) => state.appStates.loginName)
    const password = useSelector((state) => state.appStates.password)
    const formData = useSelector((state) => state.appStates.formData)

    const notifySuccess = () => toast.success('Connected Successfully!', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"

    });


    const notifyFail = () => toast.error('Error login !', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"

    });

    const serverOptions = [
        { value: 'Dataset1', label: 'Dataset1' },
        { value: 'Dataset2', label: 'Dataset2' },
        { value: 'Dataset3', label: 'Dataset3' },
    ]

    const authForm = async () => {
        let payload = { loginName: loginName, password: password }

        const response = await axios.post("https://localhost:7219/api/Data/Auth", payload);
        console.log(response.data)

        if(response.data === "Başarılı bağlantı." ){
            notifySuccess();
        }
        else{
            notifyFail()
        }

    }

    const getFormData = async () => {

        let formContent = { loginName: "", password: "", serverName: "" };
        if (loginName && password && serverName) {

            formContent.loginName = loginName;
            formContent.password = password;
            formContent.serverName = serverName;

        }
        dispatch(setFormData(formContent))
        await authForm()
    }
    console.log(formData)


    return (

        <div className="container " style={{ backgroundColor: "#92C7CF" }}>
            <section className="section   register  d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container ">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">
                                <Link className="logo d-flex align-items-center w-auto rounded-2">
                                    <img className='rounded-2' style={{ width: "100%" }} src="assets/img/logo.png" alt="" />
                                </Link>

                            </div>
                            <div className="card bg-info-subtle">
                                <div className='card-title m-0 p-2 fw-bolder fs-'>
                                    Connect Database
                                </div>
                                <div className="card-body ">
                                    <div className="col-12">
                                        <label className="form-label">Server Name</label>
                                        <Select onChange={(choise) => dispatch(setServerName(choise.value))} options={serverOptions}
                                            required />
                                    </div>

                                    <div className="col-12 mt-2">
                                        <label className="form-label">Login Name</label>
                                        <input
                                            onChange={(e) => dispatch(setLoginName(e.target.value))}
                                            required type="text" className="form-control" />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <label className="form-label">Password</label>
                                        <input
                                            onChange={(e) => dispatch(setPassword(e.target.value))}
                                            required type="password" className="form-control" />
                                    </div>
                                    <div className="col-12 d-flex justify-content-center gap-2 mt-2">
                                        <button onClick={() => getFormData()} className='btn btn-success '>Connect</button>
                                        <button className='btn btn-danger'>Cancel</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </div>


    )
}

export default Form