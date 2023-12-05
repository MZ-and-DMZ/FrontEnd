export async function requestListNotification() {
  fetch(`${process.env.REACT_APP_MOCK_API}/notification/list`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
  // const response = await fetch(`${process.env.REACT_APP_MOCK_API}/notification/list`, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  // });
  // const data = await response.json();
  // console.log('Notification List:', data);
  // return data;
}

export function requestCreateNotification(data) {
  fetch(`${process.env.REACT_APP_MOCK_API}/notification/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
}
