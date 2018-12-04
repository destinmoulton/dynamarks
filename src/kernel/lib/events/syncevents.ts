import Messenger from "../../../common/messenger";
import * as MessengerActions from "../../../common/constants/messengeractions.constants";
import Sync from "../dynalist/observers/sync";
import SyncOverwrite from "../dynalist/observers/syncoverwrite";
import * as Types from "../../../common/types";

class SyncEvents {
    private iMessenger: Messenger = null;
    private iSync: Sync = null;
    private iSyncOverwrite: SyncOverwrite = null;

    constructor(
        messenger: Messenger,
        sync: Sync,
        syncoverwrite: SyncOverwrite
    ) {
        this.iMessenger = messenger;
        this.iSync = sync;
        this.iSyncOverwrite = syncoverwrite;

        this.iMessenger.subscribe("sync", this.handleDispatch);
    }

    private handleDispatch = async (packet: Types.IMessage) => {
        switch (packet.action) {
            case MessengerActions.SYNC_OVERWRITE_SERVER:
                return await this.iSyncOverwrite.overwriteServer();
            case MessengerActions.SYNC_OVERWRITE_LOCAL:
                return await this.iSyncOverwrite.overwriteLocal();
            case MessengerActions.SYNC_SYNCHRONIZE:
                return await this.iSync.synchronize();
            default:
                return;
        }
    };
}

export default SyncEvents;
