async function getGcpCheckList() {
    try {
        const response = await fetch(`${process.env.REACT_APP_MOCK_API}/compliance/gcp/check/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
        },
    });
    const gcpData = await response.json();
    return gcpData;
    } catch (error) {
        console.error('Error fetching data from /gcp/check/list : ', error);
        throw error;
    }
}

export const parseGcpCheckList = [...Array(getGcpCheckList.gcp_check_list.length)].map((_, index) => ({
    id: index,
    type: getGcpCheckList.gcp_check_list[index].type,
    csp: getGcpCheckList.gcp_check_list[index].csp,
    title: getGcpCheckList.gcp_check_list[index].title,
    description: getGcpCheckList.gcp_check_list[index].description,
    standard: getGcpCheckList.gcp_check_list[index].standard,
    laws: getGcpCheckList.gcp_check_list[index].laws.map((law) => Object.keys(law)[0]),
}))

async function getAwsCheckList() {
    try {
        const response = await fetch(`${process.env.REACT_APP_MOCK_API}/compliance/aws/check/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const awsData = await response.json();
        return awsData;
    } catch(error) {
        console.error('Error fetching data from /aws/check/list : ', error);
        throw error;
    }
}

export const parseAwsCheckList = [...Array(getAwsCheckList.aws_check_list.length)].map((_, index) => ({
    id: index,
    type: getAwsCheckList.aws_check_list[index].type,
    csp: getAwsCheckList.aws_check_list[index].csp,
    title: getAwsCheckList.aws_check_list[index].title,
    description: getAwsCheckList.aws_check_list[index].description,
    standard: getAwsCheckList.aws_check_list[index].standard,
    laws: getAwsCheckList.aws_check_list[index].laws.map((law) => Object.keys(law)[0]),
}))