import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loki from 'react-loki';
import './jobfairloki.css';
import LocationIcon from './JFLocationIcon';
import CalendarIcon from './JFCalendarIcon';
import CompletionIcon from './JFCompletionIcon';
import JobFairConfirmation from './JobFairConfirmation';
import JobFairForm from './JobFairForm';
import LocationForm from '../locations/LocationForm';
import jobFairService from '../../services/jobFairService';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import debug from 'sabio-debug';

const _logger = debug.extend('JobFairWizard');

const JobFairWizard = () => {
    const [jobFairData, setJobFairData] = useState({
        name: '',
        summary: '',
        shortDescription: '',
        groupId: 0,
        imageUrl: '',
        externalSiteUrl: 'test.com',
        dateStart: '',
        dateEnd: '',
        jobFairTypeId: 0,
        location: {
            locationTypeId: 0,
            lineOne: '',
            lineTwo: '',
            city: '',
            stateId: 0,
            zip: '',
            latitude: 90,
            longitude: -90,
        },
        jobFairStatusId: 1,
    });
    const navigate = useNavigate();

    const onChange = (values) => {
        _logger('onChange values:', values);
        setJobFairData((prevState) => {
            const data = { ...prevState, ...values };
            _logger('onChange setJobFairData data:', data);
            return data;
        });
    };

    const onFinish = () => {
        _logger('onFinish jobFairData:', jobFairData);
        jobFairService.addJobFair(jobFairData).then(jobfairAddSuccess).catch(jobfairAddError);
        _logger('onFinish jobFairService addJobFair:', jobFairData);
    };

    const jobfairAddSuccess = (response) => {
        Swal.fire({
            title: '<strong>Jobfair was created successfully</strong>',
            icon: 'success',
            confirmButtonText: 'Yes',
        });
        _logger('Job Fair Created', response);
        navigate('/jobfairs');
    };

    const jobfairAddError = (response) => {
        _logger('Job Fair Error', response);
        toastr['error']('There was a problem, please try again.');
    };

    const locationSubmit = (location) => {
        _logger(jobFairData);
        _logger('this happens after', location);
        setJobFairData((prevState) => {
            const jobfairdData = { ...prevState };
            jobfairdData.location = { ...location };
            return jobfairdData;
        });
        _logger(jobFairData);
    };

    const wizardSteps = [
        {
            label: 'Step 1 - Job Fair Details',
            icon: <CalendarIcon />,
            component: <JobFairForm jobFairData={jobFairData} onChange={onChange} />,
        },
        {
            label: 'Step 2 - Location Details',
            icon: <LocationIcon />,
            component: <LocationForm jobFairData={jobFairData} onChange={onChange} onLocationSubmit={locationSubmit} />,
        },
        {
            label: 'Step 3 - Confirm Job Fair',
            icon: <CompletionIcon />,
            component: <JobFairConfirmation jobFairData={jobFairData} onChange={onFinish} />,
        },
    ];
    return (
        <div className="jobFairWizard">
            <Loki steps={wizardSteps} onNext={onChange} onBack={onChange} onFinish={onFinish} noActions />
        </div>
    );
};

export default JobFairWizard;
