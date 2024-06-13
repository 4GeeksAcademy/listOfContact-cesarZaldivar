import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Home = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    console.log(store.contacts);
    return (
        <div className="container d-flex flex-column align-items-center">
            <Link to="/AddContacts">
                <span className="navbar-brand mb-0 h1">Add new contact</span>
            </Link>
            {store.contacts.map((item, index) => {
                return (
                    <div className="card w-50" key={index}>
                        <div className="card-body">
                            <div>
                                <h5 className="card-title"><i className="fas fa-user"></i> {item.name}</h5>
                            </div>
                            <div className="card-text ">
                                <p><i className="fas fa-map-marker-alt"></i> {item.address}</p>
                            </div>
                            <div className="card-text ">
                                <p><i className="fas fa-phone"></i> {item.phone}</p>
                            </div>
                            <div className="card-text">
                                <p><i className="fas fa-envelope"></i> {item.email}</p>
                            </div>
                            <div className="w-25 d-flex flex-column ">
                                <button className="btn btn-danger" onClick={() => actions.deleteContact(item.id)}>Delete</button>
                                <button className="btn btn-warning" onClick={()=>navigate("/edit/" + item.id)}>Edit</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};