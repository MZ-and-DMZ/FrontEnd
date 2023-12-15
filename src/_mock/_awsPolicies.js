async function AwsPolicyData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/aws/policy/list`, {
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

export default function getAwsPolicyDescription(policyName) {
  const awsPolicies = awsPolicyData.aws_policy_list;
  const foundPolicy = awsPolicies.find((policy) => policy.PolicyName === policyName);
  return foundPolicy ? foundPolicy.Description : 'Description not found';
}

export const _awsPolicyList = [...Array(awsPolicyData.aws_policy_list.length)].map((_, index) => ({
  // id: awsPolicyData.aws_policy_list[index].Arn,
  id: index,
  createDate: awsPolicyData.aws_policy_list[index].CreateDate.$date,
  description: awsPolicyData.aws_policy_list[index].Description,
  name: awsPolicyData.aws_policy_list[index].PolicyName,
  csp: 'aws',
  // updateDate: awsPolicyData.awsPolicy_list[index].UpdateDate.$date,
}));
