import * as React from "react";
import { Button, Card, FormGroup, TextArea } from "@blueprintjs/core";

class KeyForm extends React.Component {
    handleContinue = (evt: React.SyntheticEvent) => {
        console.log(evt);
    };
    render() {
        return (
            <Card elevation={2}>
                <FormGroup
                    label="Dynalist API Secret Token"
                    labelFor="dynalist-key"
                >
                    <TextArea
                        className="dkmks-keyform-textarea"
                        id="dynalist-key"
                    />
                </FormGroup>
                <div className="dkmks-keyform-button-container">
                    <Button onClick={this.handleContinue}>Continue</Button>
                </div>
                <div className="dkmks-keyform-infolink">
                    <a href="https://dynalist.io/developer" target="_blank">
                        Generate your API secret token.
                    </a>
                </div>
            </Card>
        );
    }
}

export default KeyForm;
