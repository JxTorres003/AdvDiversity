import React from 'react';
import { Form, Card, Stack } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { withFormik } from 'formik';
import { jobFairPropTypes } from './jobFairPropTypes';
import debug from 'sabio-debug';

const _logger = debug.extend('JobFairConfirmation');
const JobFairConfirmation = (props) => {
    const { values, isSubmitting, cantBack, backLabel, onChange, nextLabel, onBack } = props;

    const onBackClicked = () => {
        onBack(values);
    };

    const onFinishClick = (e) => {
        e.preventDefault();
        _logger('logger in next function onFinish values:', values);
        onChange(values);
    };

    _logger('JobFairConfirmation values:', values);

    return (
        <Form
            onSubmit={onFinishClick}
            className="jobfair-form p-1 justify-content-center align-items-center text-center">
            <h1 className="text-dark">Job Fair Confirmation</h1>
            <h4 className="text-dark">Almost done! one last thing.</h4>
            <Card>
                <Card.Header>
                    <div className="justify-content-center align-items-center text-center">
                        <img className="img-fluid w-50" src={values.jobFairData.imageUrl} alt="job fair logo" />
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="justify-content-center align-items-center">
                        <div>
                            <div>
                                <h2 title="Job Fair Name" name="name">
                                    {values.jobFairData.name || 'Error Loading Job Fair name'}
                                    <br />
                                </h2>
                                <h3 className="jobfair-text">
                                    <strong>Jobfair Summary:</strong> &nbsp;
                                    {values.jobFairData.summary || 'Error loading Job description'}
                                </h3>
                            </div>
                            <div>
                                <h4 className="jobfair-text">
                                    <strong>Jobfair Description:</strong>&nbsp;
                                    {values.jobFairData.shortDescription || 'Error loading Job description'}
                                </h4>
                            </div>
                        </div>
                        <SimpleBar className="justify-content-center align-items-center w-auto">
                            <Stack
                                direction="horizontal"
                                className="border p-1 m-1 justify-content-center align-items-center"
                                gap={1}>
                                <Stack direction="horizontal" gap={6}>
                                    <p className="m-1">
                                        <strong>Start Date:</strong>
                                    </p>
                                    <p className="m-1">
                                        {values.jobFairData?.dateStart || 'Error Loading Date Posted'}
                                    </p>
                                </Stack>
                                <div className="vr" />
                                <Stack direction="horizontal" gap={2}>
                                    <p className="m-1">
                                        <strong>Location:</strong> <br></br>
                                        &nbsp; Address: &nbsp;
                                        {values.jobFairData?.location.lineOne ||
                                            'Error Loading location street address 1.'}
                                        <br></br>
                                        {values.jobFairData?.location.city || 'Error Loading City.'}
                                        <br></br>
                                        {values.jobFairData?.location.zip || 'Error Loading Zip.'}
                                        {values.jobFairData?.location.city || 'Error Loading City.'}, &nbsp;
                                        {values.jobFairData?.location.stateId || 'Error Loading State.'}
                                    </p>
                                </Stack>
                                <div className="vr" />
                                <Stack direction="horizontal" gap={6}>
                                    <p className=" m-1">
                                        <strong>End Date:</strong>
                                    </p>
                                    <p className=" m-1">{values.jobFairData?.dateEnd || 'Error Loading Date Posted'}</p>
                                </Stack>
                            </Stack>
                        </SimpleBar>
                    </div>
                </Card.Body>
            </Card>
            <hr />
            <Form.Group>
                <div sm="4">
                    <input type="checkbox" required />
                    &nbsp;&nbsp;
                    <Form.Label>By Clicking checkbox you are agreeing with the Terms and Conditions</Form.Label>
                </div>
                <hr />
                <div className="button-group">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={isSubmitting || cantBack}
                        onClick={onBackClicked}>
                        {backLabel}
                    </button>
                    &nbsp;
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting || !Boolean(values)}
                        required>
                        {nextLabel}
                    </button>
                </div>
            </Form.Group>
        </Form>
    );
};
JobFairConfirmation.propTypes = jobFairPropTypes;
export default withFormik({
    mapPropsToValues: (props) => ({
        jobFairData: props.jobFairData,
    }),
    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(JobFairConfirmation);
