export async function PositionData() {
    try {
      const response = await fetch('http://54.180.76.116:8080/boch/get/positionlist');
      // const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }