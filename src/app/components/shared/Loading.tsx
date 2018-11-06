import * as React from "react";
import { Spinner } from "@blueprintjs/core";

interface IProps {
    message: string;
}

const Loading = (props: IProps) => {
    return (
        <div>
            <Spinner />
            <div className="dkmks-loading-message">{props.message}</div>
        </div>
    );
};

export default Loading;
