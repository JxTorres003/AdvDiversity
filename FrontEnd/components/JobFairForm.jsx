import React, { useState, useEffect } from 'react';
import { withFormik, Field } from 'formik';
import { Row, Form, Col, FloatingLabel } from 'react-bootstrap';
import { jobFairSchema } from '../../schema/jobFairSchema';
import * as jobFairPropTypes from './jobFairPropTypes';
import * as groupService from '../../services/groupService';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import './jobfairsform.css';
import FileUploader from '../files/FileUploader';
import debug from 'sabio-debug';

const _logger = debug.extend('JobFairForm');

const JobFairForm = (props) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        isSubmitting,
        handleBlur,
        handleSubmit,
        nextLabel,
        setFieldValue,
        onNext,
    } = props;

    const [formSelect, setFormSelect] = useState({
        groups: [],
    });

    useEffect(() => {
        _logger('useEffect props:', props);
        _logger('useEffect values:', values);
        onChange();
    }, [values]);

    useEffect(() => {
        groupService.getAllGroupsPaginated(0, 6).then(onGroupSuccess).catch(onGroupError);
    }, []);

    const onGroupSuccess = (response) => {
        _logger('onGroupSuccess response:', response);
        setFormSelect((prevState) => {
            let newDropDown = { ...prevState };
            newDropDown.groups = response.item.pagedItems;
            _logger('onGroupSuccess setJobFairData newDropDown:', newDropDown.groups);
            _logger('onGroupSuccess setJobFairData pagedItems:', response.item.pagedItems);
            return newDropDown;
        });
        _logger('onGroupSuccess response:', response);
        _logger('onGroupSuccess values:', values.jobFairData);
    };

    const onGroupError = (response) => {
        _logger('useEffect onGroupError response:', response);
        toastr['error']('group select input failed.');
    };

    const onChange = () => {
        props.onChange(values);
        _logger('onChange values:', values);
    };

    const mapGroup = (group) => {
        _logger('mapGroup group:', group);
        return (
            <option value={group.id} key={`group_${group.id}`}>
                {group.name}
            </option>
        );
    };

    const onNextClicked = () => {
        onNext(values);
    };

    const handleUpload = (urlList) => {
        _logger('handleUpload urlList:', urlList);
        const imageUrl = urlList;
        setFieldValue('imageUrl', imageUrl[0].url);
        toastr['success']('File added.');
    };

    return (
        <Form onSubmit={handleSubmit} className="jobfair-form p-1 text-center">
            <h2 className="text-dark ">Job Fair Form</h2>
            <h4 className="text-dark-50  mt-2 fw-bold">Please fill in Job Fair information below</h4>
            <p className="text-top mb-4">
                Creating a Job Fair, made simple, recommended to complete all fields below for better transparency.
            </p>
            <hr />
            <Form.Group className="jobfair-group">
                <Row className="mx-auto text-center">
                    <Col>
                        <FloatingLabel htmlFor="name" label="Job Fair Name" className="mb-3 mx-auto w-75">
                            <Form.Control
                                type="text"
                                name="name"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                placeholder="Enter Job Fair name"
                                className="form-control"
                                required
                            />
                            {errors.name && touched.name && (
                                <div id="feedback" style={{ color: 'red' }}>
                                    {errors.name}
                                </div>
                            )}
                        </FloatingLabel>
                        <FloatingLabel htmlFor="summary" label="Summarize Job Fair" className="mb-3 mx-auto w-75">
                            <Form.Control
                                type="text"
                                name="summary"
                                id="summary"
                                value={values.summary}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                placeholder="Enter a summary of your Job Fair"
                                className="form-control"
                            />
                            {errors.summary && touched.summary && (
                                <div id="feedback" style={{ color: 'red' }}>
                                    {errors.summary}
                                </div>
                            )}
                        </FloatingLabel>
                        <FloatingLabel label="Short Description of Job Fair" className="mb-3 w-75 mx-auto">
                            <Form.Control
                                as="textarea"
                                name="shortDescription"
                                id="shortDescription"
                                value={values.shortDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                placeholder="Enter a short description of your Job Fair"
                                row="9"
                            />
                            {errors.shortDescription && touched.shortDescription && (
                                <div id="feedback" style={{ color: 'red' }}>
                                    {errors.shortDescription}
                                </div>
                            )}
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <div className="my-1 w-50 mx-auto">
                            <label htmlFor="imageUrl">Image banner for your Job Fair</label>
                            <FileUploader className="w-75" onHandleUploadSuccess={handleUpload} isMultilple={false} />
                            {errors.imageUrl && touched.imageUrl && (
                                <div id="feedback" style={{ color: 'red' }}>
                                    {errors.imageUrl}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
                <Row className="mx-auto">
                    <Col>
                        <div className="my-1 mx-auto jobfair-group">
                            <FloatingLabel
                                label="Select an Organization"
                                htmlFor="groupId"
                                id="jobfair-group"
                                className="mb-3 w-75 mx-auto">
                                <Form.Select
                                    name="groupId"
                                    id="groupId"
                                    value={values.groupId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <option value=""></option>
                                    {formSelect.groups.map(mapGroup)}
                                </Form.Select>
                                {errors.groupId && touched.groupId && (
                                    <div id="feedback" style={{ color: 'red' }}>
                                        {errors.groupId}
                                    </div>
                                )}
                            </FloatingLabel>
                        </div>{' '}
                        <div className="my-1 mx-auto">
                            <label htmlFor="jobFairTypeId" className="my-1 jobfair-type">
                                Job Fair Type
                            </label>
                            <div
                                role="group"
                                className="my-1"
                                aria-labelledby="my-radio-group"
                                name="jobFairTypeId"
                                id="jobFairTypeId"
                                value={values.jobFairTypeId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined">
                                <Field type="radio" name="jobFairTypeId" value="1" />
                                &nbsp; Virtual-Remote&nbsp;&nbsp; &nbsp;
                                <Field type="radio" name="jobFairTypeId" value="2" />
                                &nbsp; Location&nbsp;&nbsp; &nbsp;
                                <Field type="radio" name="jobFairTypeId" value="3" />
                                &nbsp; Hybrid&nbsp;&nbsp;
                            </div>
                            {errors.jobFairTypeId && touched.jobFairTypeId && (
                                <div id="feedback" style={{ color: 'red' }}>
                                    {errors.jobFairTypeId}
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col>
                        <label htmlFor="dateStart">When does your Job Fair start? </label>
                        <div className="my-1 w-50 mx-auto">
                            <Form.Control
                                name="dateStart"
                                id="dateStart"
                                type="datetime-local"
                                value={values.dateStart}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                placeholder="Please enter date and time"
                                className="form-control"
                            />
                            {errors.dateStart && touched.dateStart && (
                                <div id="feedback" style={{ color: 'red' }}>
                                    {errors.dateStart}
                                </div>
                            )}
                        </div>
                        <br></br>
                        <label htmlFor="dateEnd">When does your Job Fair end? </label>
                        <div className="my-1 w-50 mx-auto">
                            <Form.Control
                                name="dateEnd"
                                id="dateEnd"
                                type="datetime-local"
                                value={values.dateEnd}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                placeholder="Please enter date and time "
                                className="form-control"
                            />
                            {errors.dateEnd && touched.dateEnd && (
                                <div id="feedback" style={{ color: 'red' }}>
                                    {errors.dateEnd}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3 text-center">
                    <Col>
                        <button
                            type="submit"
                            className="btn btn-primary ml-2"
                            disabled={isSubmitting}
                            onClick={onNextClicked}>
                            {nextLabel}
                        </button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );
};

JobFairForm.propTypes = jobFairPropTypes.jobFairPropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        name: props.jobFairData.name,
        summary: props.jobFairData.summary,
        shortDescription: props.jobFairData.shortDescription,
        groupId: props.jobFairData.groupId,
        jobFairStatusId: props.jobFairData.jobFairStatusId,
        imageUrl: props.jobFairData.imageUrl,
        externalSiteUrl: props.jobFairData.externalSiteUrl,
        dateStart: props.jobFairData.dateStart,
        dateEnd: props.jobFairData.dateEnd,
        jobFairTypeId: props.jobFairData.jobFairTypeId,
    }),
    validationSchema: jobFairSchema,
    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(JobFairForm);
