async function PositionData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/positions/list`, {
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

export async function createPosition(data) {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/positions/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        positionName: data.positionName,
        description: data.description,
        csp: data.csp.toLowerCase(),
        policies: data.policies,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    }
    throw new Error('Failed to create position');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const POSITION_CSP_OPTIONS = [
  { value: 'aws', label: 'AWS' },
  { value: 'gcp', label: 'GCP' },
  { value: 'BOch', label: 'BOch' },
  // { value: 'rejected', label: 'Rejected' },
];

export const AWS_OPTIONS = [
  { value: 'aws', label: 'AWS' },
  // { value: 'rejected', label: 'Rejected' },
];

export const GCP_OPTIONS = [
  { value: 'gcp', label: 'GCP' },
  // { value: 'rejected', label: 'Rejected' },
];

const positionData = await PositionData();

export const _positionList = [...Array(positionData.position_list.length)].map((_, index) => ({
  id: index,
  positionName: positionData.position_list[index].positionName,
  // isCustom: positionData.position_list[index].isCustom,
  description: positionData.position_list[index].description,
  csp: positionData.position_list[index].csp,
  policies: positionData.position_list[index].policies.map((policy) => Object.keys(policy)[0]),
}));

export async function PositionMenuData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/aws/actioncrud`, {
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

export async function convertPosition(positionName) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_MOCK_API}/positions/convert/${positionName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function recommendPolicies(policiesList, csp) {
  try {
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/recommend/${csp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        actions: [
          ...policiesList.create,
          ...policiesList.read,
          ...policiesList.update,
          ...policiesList.delete,
        ],
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
