import * as React from "react";
import { Button, Card, FormGroup, TextArea, Spinner } from "@blueprintjs/core";

import DynalistAPI from "../../redux/api";

import settingsConstants from "../../constants/settings.constants";
import { settings } from "../../instances";

interface IProps {
    navCheckToken: () => void;
}

interface IState {
    isValidatingToken: boolean;
}

class KeyForm extends React.Component<IProps, IState> {
    textarea: any;

    constructor(props: IProps) {
        super(props);

        this.textarea = React.createRef();

        this.state = {
            isValidatingToken: false
        };
    }

    handleContinue = () => {
        const token = this.textarea.current.value;

        if (token === "") return;

        this.setState({ isValidatingToken: true });

        const dynalistapi = new DynalistAPI(token);
        dynalistapi.isTokenValid().then((isValid: boolean) => {
            this.setState({
                isValidatingToken: false
            });
            if (isValid) {
                settings.set(settingsConstants.token, token).then(() => {
                    this.props.navCheckToken();
                });
            }
        });
    };

    private _domForm() {
        return (
            <div>
                <FormGroup
                    label="Dynalist API Secret Token"
                    labelFor="dynalist-token"
                >
                    <textarea
                        className="dkmks-keyform-textarea"
                        id="dynalist-token"
                        ref={this.textarea}
                    />
                </FormGroup>
                <div className="dkmks-keyform-button-container">
                    <Button
                        onClick={this.handleContinue}
                        rightIcon="arrow-right"
                        intent="success"
                    >
                        Continue
                    </Button>
                </div>
                <div className="dkmks-keyform-infolink">
                    <a href="https://dynalist.io/developer" target="_blank">
                        Generate your API secret token.
                    </a>
                </div>
            </div>
        );
    }

    render() {
        const { isValidatingToken } = this.state;

        let view = <Spinner />;
        if (!isValidatingToken) {
            view = this._domForm();
        }
        return <Card elevation={2}>{view}</Card>;
    }
}

export default KeyForm;
