import React from 'react';
import { Card, Stack, Button, Badge } from 'react-bootstrap';
import Swal from 'sweetalert2';
import SimpleBar from 'simplebar-react';
import PropTypes from 'prop-types';

const JobFairDetails = (props) => {
    const jobfairData = props.jobFairData;
    const convertDate = (jobfairDate) => {
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        var today = new Date(jobfairDate);
        return today.toLocaleDateString('en-US', options);
    };

    const applyJobFair = () => {
        Swal.fire({
            title: `<strong>Successfully Registered!</strong><br/> Bring your resumes! <br/> Dress Sharp. <br/> Good luck.`,
            icon: 'success',
            confirmButtonText: 'Continue',
        });
    };

    return (
        <Card className="jobfair-card w-auto" xs={3} md={6} lg={9}>
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="jobfair-text">
                        <h3 title="Job Fair Name" name="card-title">
                            {jobfairData?.name || 'Error Loading Job Fair name'}
                            <br />
                        </h3>
                        <h4 className="card-title" title="Job Fair Type" name="card-title">
                            {jobfairData?.jobFairType.name || 'Error Loading Job Fair Type'}
                        </h4>
                        <h4>{jobfairData?.location.city || 'Error Loading City'}</h4>
                    </div>
                    <img className="img-fluid w-50" src={jobfairData?.imageUrl} alt="job fair logo" />
                </div>
            </Card.Header>
            <Card.Body className="p-1 text-center">
                <div>
                    <p>
                        <strong>{jobfairData.name || 'Error Loading Job Type'} - Full Jobfair Description:</strong>
                    </p>
                    <p>{jobfairData.shortDescription || 'Error loading Job description'}</p>
                </div>
                <SimpleBar className=" d-flex py-0">
                    <div className=" p-1 m-1">
                        <p className="jobfair-text">
                            Organization: <br></br>
                            {jobfairData.group.name || 'Error Loading Job Fair Group Name'}
                            {jobfairData.group.groupType.name || 'Error Loading Job Fair Group Type'}
                            <br></br>
                        </p>
                    </div>
                    <div className="border p-1 m-1">
                        <p className="jobfair-text">
                            Address: <br></br>
                            {jobfairData?.location.lineOne || 'Error Loading location street address 1.'},&nbsp;
                            {jobfairData?.location.lineTwo || 'Error Loading location street address 2.'}
                            <br></br>
                            {jobfairData?.location.city || 'Error Loading City'},&nbsp;
                            {jobfairData.location.state.name || 'Error Loading State'},&nbsp;
                            {jobfairData?.location.zip || 'Error Loading Zip'}
                        </p>
                    </div>
                    <Stack direction="horizontal" className="border p-1 m-1 justify-content-center" gap={1}>
                        <Stack direction="horizontal" gap={6}>
                            <div className="m-1">
                                <strong>Start Date:</strong>
                                <br></br>
                                {convertDate(jobfairData?.dateStart) || 'Error Loading Date Posted'}
                            </div>
                        </Stack>
                        <div className="vr" />
                        <Stack direction="horizontal" gap={2}>
                            <div className="m-1">
                                <strong>Location:</strong> &nbsp;
                                <Badge className="rounded-pill bg-info">{jobfairData.jobFairType.name}</Badge>
                                <br></br>
                                {jobfairData.location.city || 'Error Loading City'}, &nbsp;
                                {jobfairData.location.state.name || 'Error Loading State'}
                            </div>
                        </Stack>
                        <div className="vr" />
                        <Stack direction="horizontal" gap={6}>
                            <div className="m-1">
                                <strong>End Date:</strong>
                                <br></br>
                                {convertDate(jobfairData?.dateEnd) || 'Error Loading Date Posted'}
                            </div>
                        </Stack>
                    </Stack>
                </SimpleBar>
                <div className="p-2 m-2">
                    <strong>References:</strong>
                    <p>{jobfairData?.externalSiteUrl || 'Error loading Job requirements'}</p>
                    <Button variant="primary" type="submit" title="Apply" onClick={applyJobFair}>
                        Apply to this Jobfair.
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

JobFairDetails.propTypes = {
    detailsClick: PropTypes.func,
    jobFairData: PropTypes.shape({
        id: PropTypes.number,
        jobFairType: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
        name: PropTypes.string.isRequired,
        summary: PropTypes.string,
        shortDescription: PropTypes.string,
        group: PropTypes.shape({
            id: PropTypes.number,
            groupType: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            }),
            name: PropTypes.string,
            headLine: PropTypes.string,
            description: PropTypes.string,
            logo: PropTypes.string,
        }),
        location: PropTypes.shape({
            id: PropTypes.number,
            locationTypeId: PropTypes.number,
            lineOne: PropTypes.string,
            lineTwo: PropTypes.string,
            city: PropTypes.string.isRequired,
            zip: PropTypes.string,
            state: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            }),
            latitude: PropTypes.number,
            longitude: PropTypes.number,
        }),

        jobFairStatus: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
        imageUrl: PropTypes.string.isRequired,
        externalSiteUrl: PropTypes.string,
        dateStart: PropTypes.string,
        dateEnd: PropTypes.string,
        dateCreated: PropTypes.string,
        dateModified: PropTypes.string,
    }),
};

export default JobFairDetails;
