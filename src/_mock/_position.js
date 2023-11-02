async function PositionData() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_MOCK_API}/boch/get/positionlist`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const positionData = await PositionData();

export const _positionList = [...Array(positionData.position_list.length)].map(
  (_, index) => ({
    id: positionData.position_list[index]._id.$oid,
    positionName: positionData.position_list[index].positionName,
    isCustom: positionData.position_list[index].isCustom,
    description: positionData.position_list[index].description,
    csp: positionData.position_list[index].csp,
    policies: positionData.position_list[index].policies.map(
      (policy) => Object.keys(policy)[0],
    ),
  }),
);
//     const policyKeys = data.policies.map(policy => Object.keys(policy)[0]);
//     {
//     "_id": { "$oid": "65378e4f207eb8bbf82a76e2" },
//       "positionName": "aws Backend",
//       "isCustom": false,
//       "description": "aws backend developer",
//       "csp": "aws",
//       "policies": [
//         { "AmazonS3FullAccess": "arn:aws:iam::aws:policy/AmazonS3FullAccess" },
//         {
//           "AmazonSNSFullAccess": "arn:aws:iam::aws:policy/AmazonSNSFullAccess"
//         },
//         {
//           "AmazonSQSFullAccess": "arn:aws:iam::aws:policy/AmazonSQSFullAccess"
//         },
//         {
//           "CloudFrontFullAccess": "arn:aws:iam::aws:policy/CloudFrontFullAccess"
//         },
//         {
//           "AmazonEC2FullAccess": "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
//         },
//     ]
// }
