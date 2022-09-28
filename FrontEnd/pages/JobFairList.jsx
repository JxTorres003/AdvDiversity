import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import { Col, Row, Container, Stack, Button, Form, InputGroup } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import jobFairService from '../../services/jobFairService';
import * as lookUpService from '../../services/lookupService';
import JobFairCard from './JobFairCard';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';

const _logger = debug.extend('JobFairList');

const JobFairList = (props) => {
    const [jobfairData, setJobFairData] = useState({
        jobFairComponents: [],
        jobFairArray: [],
        jobFairTypes: [],
        jobFairTypesMapped: [],
        totalCount: 0,
        pageIndex: 0,
        pageSize: 5,
        hasMore: true,
        search: '',
    });

    const handleChange = (e) => {
        _logger('handleChange e:', e.target.value);
        const target = e.target;
        _logger('handleChange target:', target);
        const value = target.value;
        if (value === 'Location' || 'Hybrid' || 'Virtual') {
            setJobFairData((prevState) => ({
                ...prevState,
                search: value,
                pageIndex: 0,
                pageSize: 15,
                totalCount: 0,
                hasMore: true,
                jobFairArray: [],
                jobFairComponents: [],
                jobFairTypes: [],
            }));
        } else if (value.length >= 1) {
            setJobFairData((prevState) => ({
                ...prevState,
                search: value,
                pageIndex: 0,
                pageSize: 15,
                totalCount: 0,
                hasMore: true,
                jobFairArray: [],
                jobFairComponents: [],
                jobFairTypes: [],
            }));
        } else {
            return;
        }
    };

    //Search, Filter and Render features
    useEffect(() => {
        if (jobfairData.search === '') {
            jobFairService
                .getAllJobFairs(jobfairData.pageIndex, jobfairData.pageSize)
                .then(onGetJobFairSuccess)
                .catch(onGetJobFairError);
            _logger('useEffect getAllJobFairs fired');
        } else if (jobfairData.search.length > 0 || jobfairData.search === 'Location' || 'Hybrid' || 'Virtual') {
            jobFairService
                .searchJobFairs(jobfairData.pageIndex, jobfairData.pageSize, jobfairData.search)
                .then(onGetJobFairSuccess)
                .catch(onGetJobFairError);
            _logger('useEffect searchJobFairs:', jobfairData.pageIndex, jobfairData.pageSize, jobfairData.search);
        } else {
            return;
        }
    }, [jobfairData.pageIndex, jobfairData.pageSize, jobfairData.search]);
    const onGetJobFairSuccess = (data) => {
        const jobFairArray = data.item.pagedItems;
        _logger('onGetJobFairSuccess jobFairArray:', jobFairArray);
        setJobFairData((prevState) => {
            let jobfair = { ...prevState };
            jobfair.totalCount = data.item.totalCount;
            jobfair.hasMore = true;
            jobfair.jobFairArray = [...jobfair.jobFairArray, ...jobFairArray];
            jobfair.jobFairComponents = jobfair.jobFairArray.map(mapJobFairs);
            _logger('onGetJobFairSuccess setJobFairData jobfair:', jobfair);

            return jobfair;
        });
    };
    const mapJobFairs = (jobfair) => {
        _logger('mapJobFairs', jobfair);
        return <JobFairCard key={`jobFair_${jobfair.id}`} jobFairData={jobfair} detailsClick={props.detailsClick} />;
    };
    const onGetJobFairError = () => {
        setJobFairData((prevState) => {
            const jobfairData = { ...prevState };
            jobfairData.hasMore = false;
            toastr['error']('Jobfair list failed.');
            return jobfairData;
        });
    };
    const renderAllJobFairs = () => {
        setJobFairData((prevState) => ({
            ...prevState,
            search: '',
            pageIndex: 0,
            pageSize: 5,
            totalCount: 0,
            hasMore: true,
            jobFairArray: [],
            jobFairComponents: [],
            jobFairTypes: [],
        }));
        jobFairService
            .getAllJobFairs(jobfairData.pageIndex, jobfairData.pageSize)
            .then(onGetJobFairSuccess)
            .catch(onGetJobFairError);
    };

    //JobfairType Features
    useEffect(() => {
        let payload = ['JobFairTypes'];
        lookUpService.getTypes(payload).then(onGetLookupSuccess).catch(onGetLookupError);
    }, []);
    const onGetLookupSuccess = (response) => {
        _logger('JobfairTypeLookupSuccess', response);
        setJobFairData((prevState) => {
            let pd = { ...prevState };
            pd.jobFairTypes = response.item.jobFairTypes;
            pd.jobFairTypesMapped = pd.jobFairTypes.map(mapJobFairTypes);
            _logger('onGetLookupSuccess setJobFairData pd:', pd);

            return pd;
        });
    };
    const mapJobFairTypes = (jobFairType) => {
        _logger('mapJobFairTypes jobFairType:', jobFairType);
        return (
            <option value={jobFairType.name} key={`jobFairType_${jobFairType.id}`} onClick={handleChange}>
                {jobFairType.name}
            </option>
        );
    };
    const onGetLookupError = (err) => {
        toastr.error('JobfairTypeLookupError', err);
    };

    const onPageChange = () => {
        setJobFairData((prevState) => {
            const jfData = { ...prevState };
            jfData.pageIndex = jfData.pageIndex + 1;
            jfData.jobFairComponents = jfData.jobFairArray.map(mapJobFairs);
            _logger('onPageChange setJobFairData jfData:', jfData);
            return jfData;
        });
    };

    return (
        <Col className="simplebar-content-wrapper">
            <Container className="p-1 mb-2 d-flex align-items-center">
                <Stack fluid="md" gaqp={3} className="d-flex align-items-center">
                    <Row className="w-75 h-50">
                        <Button variant="outline-secondary" size="sm" type="submit" onClick={renderAllJobFairs}>
                            View All
                        </Button>
                    </Row>

                    <InputGroup className="mb-1 p-1 w-75 h-50">
                        <InputGroup.Text id="basic-addon1">Search:</InputGroup.Text>
                        <Form.Control
                            onChange={handleChange}
                            type="text"
                            placeholder="...any keyword"
                            aria-label="text"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Form.Select className="form-control w-75 h-50" onChange={handleChange}>
                        <option value="0"> Search by Location Type</option>
                        {jobfairData.jobFairTypesMapped}
                    </Form.Select>
                </Stack>
            </Container>
            <SimpleBar scrollableNodeProps={{ id: 'scrollableDiv' }} className="card-body py-0 jobfair-list-container">
                <InfiniteScroll
                    dataLength={jobfairData.jobFairComponents}
                    next={onPageChange}
                    loader={<h3>Loading...</h3>}
                    hasMore={jobfairData.hasMore}
                    scrollableTarget="scrollableDiv"
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Could not find any more jobfairs.</b>
                        </p>
                    }>
                    {jobfairData?.jobFairComponents}
                </InfiniteScroll>
            </SimpleBar>
        </Col>
    );
};

JobFairList.propTypes = {
    detailsClick: PropTypes.func.isRequired,
    search: PropTypes.func,
};

export default JobFairList;
