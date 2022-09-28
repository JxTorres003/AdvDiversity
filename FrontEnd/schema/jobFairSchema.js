import * as Yup from 'yup';

const jobFairSchema = Yup.object().shape({
    jobFairTypeId: Yup.number().required('Job Fair Type is required.'),
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(255, 'Name cannot be more than 100 characters')
        .required('Name is required.'),
    summary: Yup.string()
        .min(2, 'Summary must be at least 2 characters')
        .max(255, 'Summary cannot be more than 100 characters')
        .required('Summary is required.'),
    shortDescription: Yup.string()
        .min(2, 'Short Description must be at least 2 characters')
        .max(4000, 'Short Description cannot be more than 100 characters')
        .required('Short Description is required.'),
    groupId: Yup.number().required('Job Fair group is required.'),
    location: Yup.object().shape({
        lineOne: Yup.string().required('Address is Required'),
        lineTwo: Yup.string(),
        city: Yup.string().required('City is Required'),
        zip: Yup.string().required('Zipcode is Required'),
        locationTypeId: Yup.number().notOneOf(['0', 0], 'Please select a Location Type').required('Required'),
        stateId: Yup.number().notOneOf(['0', 0], 'Please select a Location Type').required('Required'),
    }),
    jobFairStatusId: Yup.number().required('Job Fair Type is required.'),
    imageUrl: Yup.string()
        .min(3, 'Image Url must be at least 2 characters')
        .max(400, 'Image Url cannot be more than 100 characters'),
    // .required('Image Url is required.'),
    externalSiteUrl: Yup.string()
        .min(3, 'External Site Url must be at least 2 characters')
        .max(400, 'External Site Url cannot be more than 100 characters')
        .required('External Site Url is required.'),

    dateStart: Yup.string().min(2).required('Required'),
    dateEnd: Yup.string().min(2).required('Required'),
});

const jobFairLocationSchema = Yup.object().shape({
    location: Yup.object().shape({
        lineOne: Yup.string().required('Address is Required'),
        lineTwo: Yup.string(),
        city: Yup.string().required('City is Required'),
        zip: Yup.string().required('Zipcode is Required'),
        locationTypeId: Yup.number().notOneOf(['0', 0], 'Please select a Location Type').required('Required'),
        stateId: Yup.number().notOneOf(['0', 0], 'Please select a State').required('Required'),
    }),
});

export { jobFairSchema, jobFairLocationSchema };
