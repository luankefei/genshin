import React from "react";
import ApiClient from "../utils/request";
import { IClient } from "../interface/client.type";

// TODO: client drop the new
const client: IClient = new ApiClient() as any;
const ClientContext = React.createContext(client);
const ClientProvider = (props: any) => <ClientContext.Provider value={client}>{props.children}</ClientContext.Provider>;

export { ClientContext };

export default ClientProvider;
