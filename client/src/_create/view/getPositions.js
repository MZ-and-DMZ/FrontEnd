// fetch from .env file
// export async function GetPositions() {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/boch/get/positionlist`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function GetPositions() {
  try {
    // const response = await fetch('http://54.180.76.116:8080/boch/get/positionlist');
    const response = await fetch(`${process.env.REACT_APP_MOCK_API}/boch/get/positionlist`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
// fetch from .env file
// export async function GetPositions() {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/positions`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
