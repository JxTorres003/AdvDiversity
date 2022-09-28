import React from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import JobFairList from './JobFairList';
import JobFairDetails from './JobFairDetails';
import './jobfairspage.css';
import JobFairPlaceholder from './JobFairPlaceHolder';
import debug from 'sabio-debug';
const _logger = debug.extend('JobFairs');

function JobFairs() {
    const [details, setDetails] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const onDetailsClick = (jobfair) => {
        _logger(jobfair);
        setDetails(jobfair);
        setShowDetails(true);
        setShowPlaceholder(false);
    };

    return (
        <Container fluid>
            <Row>
                <JobFairList detailsClick={onDetailsClick} />
                <Col xs={2} md={4} lg={8}>
                    {showDetails && <JobFairDetails jobFairData={details} />}
                    {showPlaceholder && <JobFairPlaceholder />}
                </Col>
            </Row>
        </Container>
    );
}

export default JobFairs;
