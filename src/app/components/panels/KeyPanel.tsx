import * as React from "react";
import { Button, Card, FormGroup, TextArea } from "@blueprintjs/core";

class KeyPanel extends React.Component {
    handleContinue = () => {
        console.log("continue clicked");
    };
    render() {
        return (
            <Card elevation={2}>
                <FormGroup label="Dynalist Key" labelFor="dynalist-key">
                    <TextArea id="dynalist-key" />
                </FormGroup>
                <Button onClick={this.handleContinue}>Continue</Button>
            </Card>
        );
    }
}

export default KeyPanel;
