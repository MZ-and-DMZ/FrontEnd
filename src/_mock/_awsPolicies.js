async function AwsPolicyData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/boch/get/aws/policylist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const awsPolicyData = await AwsPolicyData();

function getAwsPolicyDescription(policyName) {
  const awsPolicies = awsPolicyData.aws_policy_list;
  const foundPolicy = awsPolicies.find(policy => policy.PolicyName === policyName);
  return foundPolicy ? foundPolicy.Description : 'Description not found';
}

export const _awsPolicyList = [...Array(awsPolicyData.aws_policy_list.length)].map((_, index) => ({
  id: awsPolicyData.aws_policy_list[index]._id,
  createDate: awsPolicyData.aws_policy_list[index].createDate.$createDate,
  description: awsPolicyData.aws_policy_list[index].description,
  policyName: awsPolicyData.aws_policy_list[index].policyName,
  updateDate: awsPolicyData.awsPolicy_list[index].updateDate.$updateDate,
}));
