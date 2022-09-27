import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';
const jobFairService = {
    endpoint: `${API_HOST_PREFIX}/api/jobfairs`,
};

jobFairService.getLookups = (payload) => {
    const config = {
        method: 'POST',
        url: process.env.REACT_APP_API_HOST_PREFIX + '/api/lookups',
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

jobFairService.addJobFair = (payload) => {
    const config = {
        method: 'POST',
        url: `${jobFairService.endpoint}`,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

jobFairService.editJobFair = (id) => {
    const config = {
        method: 'PUT',
        url: `${jobFairService.endpoint}/${id}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

jobFairService.getAllJobFairs = (index, size) => {
    const config = {
        method: 'GET',
        url: `${jobFairService.endpoint}/paginate?pageIndex=${index}&pageSize=${size}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

jobFairService.searchJobFairs = (index, size, query) => {
    const config = {
        method: 'GET',
        url: `${jobFairService.endpoint}/search?pageIndex=${index}&pageSize=${size}&query=${query}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

jobFairService.deleteJobFair = (id) => {
    const config = {
        method: 'DELETE',
        url: `${jobFairService}`,
        crossdomain: true,
        data: id,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export default jobFairService;
