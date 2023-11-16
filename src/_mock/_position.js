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
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/boch/create/position`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        positionName: data.name,
        description: data['position description'],
        csp: data.csp,
        policies: [],
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