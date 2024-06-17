import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Home = () => {
    const [agendaName, setAgendaName] = useState("");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    console.log(store.contacts);

    const handlerGet = async (event) => {
        setAgendaName(event.target.value);
        try {
            await actions.getAgenda(event.target.value);
            

        } catch (error) {
            console.error(error);
        }
    }

    const handlerCreateAgenda = async () => {
        try {
            if(agendaName.length > 0){
                await actions.createAgenda(agendaName);
            }else{
                alert("the name of the agenda cannot be empty");
            }

        } catch (error) {
            console.error(error);
        }
    }

    function eraseContact(id){
        actions.deleteContact(id);
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <p>search or create agenda</p>
            <input type="text" onChange={handlerGet} />
            <button className="btn btn-primary" onClick={handlerCreateAgenda}>Create</button>
            <Link to="/AddContacts">
                <span className="navbar-brand mb-0 h1">Add new contact</span>
            </Link>
            {store.contacts && store.contacts.map((item, index) => {
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
                                <button className="btn btn-danger" onClick={() => eraseContact(item.id)}>Delete</button>
                                <button className="btn btn-warning" onClick={()=>navigate("/edit/" + item.id)}>Edit</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};