import React, { useState,useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContacts = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {store,actions} = useContext(Context);
    const [inputValue, setInputValue] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    function handleChange(event) {
        setInputValue({ ...inputValue,[event.target.name]:event.target.value })
    }

    async function handleSubmit (event){
        event.preventDefault();
        if(inputValue.name == "" || inputValue.email == "" || inputValue.address == "" || inputValue.phone == ""){
            alert("the inputs can not be empty");
            return
        }
        let response = null;
        if(!params.id){
             response = await actions.addContact(inputValue);
        }else{
             response = await actions.editContact(inputValue);
        }
        if(response){
            navigate("/")
        }else{
            alert("the contact can not be created");
        }
    }
    useEffect(()=>{
       if(params.id && store.contacts.length > 0){
            setInputValue(store.contacts.find(item => item.id == params.id))
       } 
    },[params.id, store.contacts]);
    return (
        <div className="container">
            <form action="" onSubmit={handleSubmit}>
                <h1 className="text-center">Add new contact</h1>
                <div>
                    <label htmlFor="" className="form-label">Full name</label>
                    <input
                        name="name"
                        value={inputValue.name}
                        onChange={(event) => handleChange(event)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="" className="form-label">Email</label>
                    <input
                        name="email"
                        value={inputValue.email}
                        onChange={(event) => handleChange(event)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="" className="form-label">Phone</label>
                    <input
                        name="phone"
                        value={inputValue.phone}
                        onChange={(event) => handleChange(event)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="" className="form-label">Address</label>
                    <input
                        name="address"
                        value={inputValue.address}
                        onChange={(event) => handleChange(event)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">Save</button>
            </form>
            <Link to="/">
                <span className="navbar-brand mb-0 h1">or get back to contacts</span>
            </Link>
        </div>
    )
};
