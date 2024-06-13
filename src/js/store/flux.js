import { stringify } from "query-string";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiUrl: "https://playground.4geeks.com/contact",
			contacts: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			createAgenda: async (newAgendaData) => {
                try {
                    const response = await fetch( store.apiUrl +"/agendas/Donatello", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });
                    if (!response.ok) {
                        throw new Error("There has been an error");
                    }
                   // getActions().getAgenda();
                } catch (error) {
                    console.log(error);
                }
            },
			getAgenda: async() =>{
				const store = getStore();
				const actions = getActions();
				try {
					const response = await fetch(store.apiUrl + "/agendas/Donatello");
					if(response.status == "404"){
						actions.createAgenda();
						actions.getAgenda();
					}
					if(!response.ok){
						throw new Error("There has been error");
					}
					const data = await response.json();
					console.log(data);
					setStore({contacts: data.contacts});
				} catch (error) {
					console.log(error)
				}
			},
			addContact: async(contact) =>{
				//{name: string, email: string, phone: string, address: string}
				const store = getStore();
				try {
					const response = await fetch(store.apiUrl + "/agendas/Donatello/contacts",{
						method:"POST",
						body: JSON.stringify(contact),
						headers:{"Content-type": "application/json",}
					});
					 const data = await response.json();
					if(!response.ok){
						throw  new Error("the contact can not be created");
					}
					setStore({contacts: [...store.contacts, data]});
					return true;
				} catch (error) {
					console.log(error);
				}
			},
			editContact: async(contact) =>{
				const store = getStore();
				console.log(contact);
				try {
					const response = await fetch(store.apiUrl + "/agendas/Donatello/contacts/" + contact.id ,{
						method:"PUT",
						body: JSON.stringify(contact),
						headers:{"Content-type": "application/json",}
					});
					 const data = await response.json();
					if(!response.ok){
						throw  new Error("the contact can not be created");
					}
					setStore({contacts: store.contacts.map(item => {
						if(item.id == contact.id){
							return data;
						}
						return item
					})});
					return true;
				} catch (error) {
					console.log(error);
				}
			},
			deleteContact: async(id) =>{
				const store = getStore();
				try {
					const response = await fetch(store.apiUrl + "/agendas/Donatello/contacts/" + id ,{
						method: "DELETE",
					} 
					);
					if(response.ok){
						setStore({
							contacts: store.contacts.filter((contact) => id !== contact.id )
						});
					}
				} catch (error) {
					
				}
			},
		}
	};
};

export default getState;
