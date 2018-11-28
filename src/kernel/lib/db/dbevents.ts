import DB from "./db";
import Messenger from "../../../common/messenger";
import * as MessengerActions from "../../../common/constants/messengeractions.constants";
import * as Types from "../../../common/types";

class DBEvents {
    private topic: string = "db";
    private iDB: DB = null;
    private iMessenger: Messenger = null;

    constructor(DB: DB, messenger: Messenger) {
        this.iDB = DB;
        this.iMessenger = messenger;

        this.iMessenger.subscribe("db", this.handleDispatch);
    }

    private handleDispatch = (packet: Types.IDispatchMessage) => {
        switch (packet.action) {
            case MessengerActions.DB_GET_INSTALLATIONS:
                return this.getInstallations();
            default:
                return;
        }
    };

    private getInstallations() {
        const installations = this.iDB.getAllInstallations();
        const packet = {
            action: MessengerActions.DB_INSTALLATIONS_DATA,
            data: installations
        };
        this.iMessenger.send(this.topic, packet);
    }
}

export default DBEvents;
