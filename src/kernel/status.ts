import * as types from "../common/types";

interface IStatus {
    currentStatus: types.EKernelStatus;
}

class Status implements IStatus {
    currentStatus: types.EKernelStatus;

    constructor() {
        this.currentStatus = types.EKernelStatus.Unconfigured;
    }

    get() {
        return this.currentStatus;
    }
}

export default Status;
