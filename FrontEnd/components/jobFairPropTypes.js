import PropTypes from 'prop-types';

const jobFairPropTypes = {
    formData: PropTypes.shape({
        jobFairType: PropTypes.shape({
            id: PropTypes.number,
            type: PropTypes.string.isRequired,
        }),
        name: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        group: PropTypes.shape({
            id: PropTypes.number,
            groupTypeId: PropTypes.number,
            name: PropTypes.string,
            headLine: PropTypes.string,
            description: PropTypes.string,
            logo: PropTypes.string,
        }),
        // location: PropTypes.shape({
        //     locationTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        //     lineOne: PropTypes.string.isRequired,
        //     lineTwo: PropTypes.string,
        //     city: PropTypes.string.isRequired,
        //     zip: PropTypes.string.isRequired,
        //     stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        //     latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        //     longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        // }),
        // state: PropTypes.shape({
        //     id: PropTypes.number,
        //     name: PropTypes.string.isRequired,
        // }),
        jobFairStatus: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
        imageUrl: PropTypes.string,
        externalSiteUrl: PropTypes.string,
        dateStart: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
        dateEnd: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
        dateCreated: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
        dateModified: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    }),
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    handleSubmit: PropTypes.func,
    onChange: PropTypes.func,
    nextLabel: PropTypes.string,
    backLabel: PropTypes.string,
    onBack: PropTypes.func,
    onNext: PropTypes.func,
    isSubmitting: PropTypes.bool,
    cantBack: PropTypes.bool,
};

export { jobFairPropTypes };
