import React from 'react';
import { Card } from 'react-bootstrap';
import logo from '../../assets/images/users/logo-transparent2.png';

const JobFairPlaceholder = () => {
    return (
        <Card className="bg-white jobfair-card p-1 text-center border-0" xs={3} md={6} lg={6}>
            <Card.Title className="jobfair-text">
                <h2>A new opportunity awaits!</h2>
                <br></br>
                <h4>Advance into a jobfair today.</h4>
            </Card.Title>
            <Card.Text>
                Click on any jobfair card on the left to get more information! <br></br>
                Scroll to see more.
            </Card.Text>
            <Card.Img className="opacity-50" src={logo} alt="logo-image" />
        </Card>
    );
};

export default JobFairPlaceholder;
