import React from 'react';
import { Card, Stack } from 'react-bootstrap';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
var _logger = debug.extend('JobFairCard');
function JobFairCard(props) {
    const jfData = props.jobFairData;
    _logger('jobfair card', jfData);
    const showJobDetails = () => {
        props.detailsClick(jfData);
    };

    const getTimeDifference = () => {
        const daysBetween = new Date().getDate() - new Date(jfData?.dateCreated).getDate();
        if (daysBetween === 0) {
            return 'Today';
        } else if (daysBetween === 1) {
            return 'Yesterday';
        } else if (daysBetween > 30) {
            return `30+ days ago`;
        } else if (daysBetween < 0) {
            const dayBetween = daysBetween + 30;
            return `${dayBetween} days ago`;
        } else {
            return `${daysBetween} days ago`;
        }
    };

    return (
        <Card
            key={jfData.id.length}
            onClick={showJobDetails}
            className="jobfair-card-style ms-auto"
            tabIndex="0"
            xs={2}
            md={4}
            lg={8}>
            <Card.Body className="p-1 jobfair-text text-center">
                <div className="my-2 d-flex">
                    <Stack gap={4}>
                        <div className="p-2">
                            <h3>
                                {jfData?.name || 'Error Loading Job Fair name '}
                                <br />
                            </h3>
                            <h4 className="card-title" title="Job fair title" name="card-title">
                                {jfData?.jobFairType.name || 'Error Loading Job Fair Type'}&nbsp;&nbsp;
                                {jfData.location.city || 'Error Loading City '}
                            </h4>
                            <div className="w-50 mx-auto">
                                <img className="img-thumbnail rounded " src={jfData.imageUrl} alt="logo" />
                            </div>
                        </div>
                    </Stack>
                </div>
                <div className="border rounded p-2 mb-3 d-flex">
                    <span className="mb-0">{jfData.summary.slice(0, 100)}...</span>
                </div>
                <div className="mb-1">
                    <Stack gap={4}>
                        <div name="datePostedMeta">{getTimeDifference()}</div>
                    </Stack>
                </div>
            </Card.Body>
        </Card>
    );
}

JobFairCard.propTypes = {
    detailsClick: PropTypes.func,
    jobFairData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        jobFairType: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
        name: PropTypes.string.isRequired,
        summary: PropTypes.string,
        shortDescription: PropTypes.string,
        group: PropTypes.shape({
            id: PropTypes.number,
            groupTypeId: PropTypes.number,
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
            city: PropTypes.string,
            zip: PropTypes.string,
            stateId: PropTypes.number,
            latitude: PropTypes.number,
            longitude: PropTypes.number,
        }),
        state: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
        jobFairStatus: PropTypes.shape({
            id: PropTypes.number.isRequired,
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

export default React.memo(JobFairCard);
