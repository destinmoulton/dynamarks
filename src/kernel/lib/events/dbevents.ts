import DB from "../dynalist/observers/db";
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

    private handleDispatch = async (packet: Types.IMessage) => {
        switch (packet.action) {
            case MessengerActions.DB_GET_INSTALLATIONS:
                return this.getInstallations();
            case MessengerActions.DB_ADD_INSTALLATION:
                return await this.iDB.addInstallation(packet.payload);
            case MessengerActions.DB_SET_CURRENT_INSTALLATION:
                return await this.iDB.setCurrentInstallation(
                    packet.payload.installationID
                );
            default:
                return;
        }
    };

    private getInstallations() {
        const installations = this.iDB.getAllInstallations();
        const packet = {
            action: MessengerActions.DB_INSTALLATIONS_DATA,
            payload: installations
        };
        this.iMessenger.send(this.topic, packet);
    }
}

export default DBEvents;
