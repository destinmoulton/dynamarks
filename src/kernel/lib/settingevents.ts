import Messenger from "../../common/messenger";
import * as MessengerActions from "../../common/constants/messengeractions.constants";

class SettingEvents {
    private iMessenger: Messenger = null;
    constructor(messenger: Messenger) {
        this.iMessenger = messenger;
        this.iMessenger.subscribe("settings", this.handleDispatch);
    }

    private handleDispatch = async (packet: Types.IDispatchMessage) => {
        switch (packet.action) {
            case MessengerActions.SETTINGS_CHANGE:
                return await this.prepareToAct();
            default:
                return;
        }
    };
}

export default SettingEvents;
