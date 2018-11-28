import Messenger from "../../common/messenger";
import * as MessengerActions from "../../common/constants/messengeractions.constants";
import * as Types from "../../common/types";

class SettingEvents {
    private iMessenger: Messenger = null;
    constructor(messenger: Messenger) {
        this.iMessenger = messenger;
        this.iMessenger.subscribe("settings", this.handleDispatch);
    }

    private handleDispatch = async (packet: Types.IMessage) => {
        switch (packet.action) {
            case MessengerActions.SETTINGS_CHANGE:
                return;
            default:
                return;
        }
    };
}

export default SettingEvents;
