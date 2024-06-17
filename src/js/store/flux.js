
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiUrl: "https://playground.4geeks.com/contact",
			contacts: [],
			newAgenda: "",
		},
		actions: {
			// Use getActions to call a function within a fuction
			createAgenda: async (agendaName) => {
				const actions = getActions();
				const store = getStore();
				try {
					const response = await fetch(`${store.apiUrl}/agendas/${agendaName}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
					});
					setStore({
						newAgenda: agendaName,
					});
					console.log(store.newAgenda);
					if (!response.ok) {
						throw new Error("There has been an error");
					} else {
						alert("agenda creada satisfactoriamente");
						actions.getAgenda();
						
					}
				} catch (error) {
					console.log(error);
				}
			},
			getAgenda: async (inputValue) => {
				const store = getStore();
				const actions = getActions();
				try {
					const response = await fetch(`${store.apiUrl}/agendas/${inputValue}`);
					if (response.status == "404") {
						/*actions.createAgenda();
						actions.getAgenda();*/
					}
					if (!response.ok) {
						throw new Error("There has been error");
					}
					const data = await response.json();
					console.log(data);
					setStore({
						 ...store, contacts: data.contacts, 
						 newAgenda: inputValue
						});
					console.log(store.newAgenda);	
				} catch (error) {
					console.log(error)
				}
			},
			addContact: async (contact) => {
				//{name: string, email: string, phone: string, address: string}
				const store = getStore();
					const response = await fetch(`${store.apiUrl}/agendas/${store.newAgenda}/contacts`, {
						method: "POST",
						body: JSON.stringify(contact),
						headers: { "Content-type": "application/json", }
					});
					const data = await response.json();
					setStore({
						contacts: [...store.contacts, data]
					});
					console.log(data);
					actions.getAgenda();
					if (!response.ok) {
						throw new Error("the contact can not be created");
					}
			},
			editContact: async (contact) => {
				const store = getStore();
				console.log(contact.id);
				try {
					const response = await fetch(`${store.apiUrl}/agendas/${store.newAgenda}/contacts/${contact.id}`, {
						method: "PUT",
						body: JSON.stringify(contact),
						headers: { "Content-type": "application/json", }
					});
					const data = await response.json();
					if (!response.ok) {
						throw new Error("the contact can not be created");
					}
					setStore({
						contacts: store.contacts.map(item => {
							if (item.id == contact.id) {
								return data;
							}
							return item
						})
					});
					return true;
				} catch (error) {
					console.log(error);
				}
			},
			deleteContact: async (id) => {
				const store = getStore();
				try {
					const response = await fetch(`${store.apiUrl}/agendas/${store.newAgenda}/contacts/${id}`, {
						method: "DELETE",
					}
					);
					if (response.ok) {
						setStore({
							contacts: store.contacts.filter((contact) => id !== contact.id)
						});
					}
					console.log(id);
				} catch (error) {

				}
			},
		}
	};
};

export default getState;
