async function getGcpCheckList() {
    try {
        const response = await fetch(`${process.env.REACT_APP_MOCK_API}/compliance/gcp/check/list`);
        const gcpData = await response.json();

        if (!gcpData.gcp_compliance_list) {
            console.warn('GCP check list is not available in the response:', gcpData);
        } else { console.log('gcpData',gcpData)}

        return gcpData;
    } catch (error) {
        console.error('Error fetching GCP check list:', error);
        throw error;
    }
}


const gcpCheckListData = await getGcpCheckList();

const gcpCheckList = gcpCheckListData.gcp_compliance_list || [];
if (gcpCheckList.length === 0) {
    console.warn('GCP check list is empty.');
}

export const _gcpCheckList = gcpCheckList.map((item, index) => ({
    id: item._id,
    type: item.type,
    csp: item.csp,
    description: item.description,
    standard: item.standard,
    laws: Array.isArray(item.law)
    ? item.law.map((lawItem) => (typeof lawItem === 'string' ? lawItem : Object.keys(lawItem)[0])).join(', ')
    : item.law,
}));

async function getAwsCheckList() {
    try {
        const response = await fetch(`${process.env.REACT_APP_MOCK_API}/compliance/aws/check/list`);
        const awsData = await response.json();

        if (!awsData.aws_compliance_list) {
            console.warn('AWS check list is not available in the response:', awsData);
        } else { console.log('awsData',awsData)}

        return awsData;
    } catch (error) {
        console.error('Error fetching AWS check list:', error);
        throw error;
    }
}


const awsCheckListData = await getAwsCheckList();

const awsCheckList = awsCheckListData.aws_compliance_list || [];
if (awsCheckList.length === 0) {
    console.warn('AWS check list is empty.');
}

export const _awsCheckList = awsCheckList.map((item) => ({
    id: item._id,
    type: item.type,
    csp: item.csp,
    description: item.description,
    standard: item.standard,
    laws: Array.isArray(item.laws) ? item.laws.map((law) => Object.keys(law)[0]) : [],
}));


// async function getAwsCheckList() {
//     try {
//         const response = await fetch(`${process.env.REACT_APP_MOCK_API}/compliance/aws/check/list`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         const awsData = await response.json();
//         return awsData;
//     } catch(error) {
//         console.error('Error fetching data from /aws/check/list : ', error);
//         throw error;
//     }
// }

// export const _awsCheckList = [...Array(getAwsCheckList.aws_check_list.length)].map((_, index) => ({
//     id: index,
//     type: getAwsCheckList.aws_check_list[index].type,
//     csp: getAwsCheckList.aws_check_list[index].csp,
//     title: getAwsCheckList.aws_check_list[index].title,
//     description: getAwsCheckList.aws_check_list[index].description,
//     standard: getAwsCheckList.aws_check_list[index].standard,
//     laws: getAwsCheckList.aws_check_list[index].laws.map((law) => Object.keys(law)[0]),
// }))