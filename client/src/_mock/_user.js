import { countries } from "src/assets/data";
import { _mock } from "./_mock";

// ----------------------------------------------------------------------

export const USER_CSP_OPTIONS = [
  { value: "AWS", label: "AWS" },
  { value: "GCP", label: "GCP" },
  // { value: 'banned', label: 'Banned' },
  // { value: 'rejected', label: 'Rejected' },
];

export const _userAbout = {
  id: _mock.id(1),
  role: _mock.role(1),
  email: _mock.email(1),
  country: countries[1].label,
  school: _mock.companyName(2),
  company: _mock.companyName(1),
  coverUrl: _mock.image.cover(3),
  totalFollowers: _mock.number.nativeL(1),
  totalFollowing: _mock.number.nativeL(2),
  quote:
    "Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..",
  socialLinks: {
    facebook: `https://www.facebook.com/caitlyn.kerluke`,
    instagram: `https://www.instagram.com/caitlyn.kerluke`,
    linkedin: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitter: `https://www.twitter.com/caitlyn.kerluke`,
  },
};

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  country: countries[index + 1].label,
  avatarUrl: _mock.image.avatar(index),
}));

export const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  postedAt: _mock.time(index),
  title: _mock.postTitle(index),
  imageUrl: _mock.image.cover(index),
}));

export const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  media: _mock.image.travel(index + 1),
  message: _mock.sentence(index),
  personLikes: [...Array(20)].map((__, personIndex) => ({
    name: _mock.fullName(personIndex),
    avatarUrl: _mock.image.avatar(personIndex + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatarUrl: _mock.image.avatar(index + 5),
        name: _mock.fullName(index + 5),
      },
      createdAt: _mock.time(2),
      message: "Praesent venenatis metus at",
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatarUrl: _mock.image.avatar(index + 6),
        name: _mock.fullName(index + 6),
      },
      createdAt: _mock.time(3),
      message:
        "Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.",
    },
  ],
}));

export const _userCards = [...Array(21)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  coverUrl: _mock.image.cover(index),
  avatarUrl: _mock.image.avatar(index),
  totalFollowers: _mock.number.nativeL(index),
  totalPosts: _mock.number.nativeL(index + 2),
  totalFollowing: _mock.number.nativeL(index + 1),
}));

// export const _userPayment = [...Array(3)].map((_, index) => ({
//   id: _mock.id(index),
//   cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
//   cardType: ['mastercard', 'visa', 'visa'][index],
//   primary: index === 1,
// }));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  primary: index === 0,
  name: _mock.fullName(index),
  phoneNumber: _mock.phoneNumber(index),
  fullAddress: _mock.fullAddress(index),
  addressType: (index === 0 && "Home") || "Office",
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  invoiceNumber: `INV-199${index}`,
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userPlans = [
  {
    subscription: "basic",
    price: 0,
    primary: false,
  },
  {
    subscription: "starter",
    price: 4.99,
    primary: true,
  },
  {
    subscription: "premium",
    price: 9.99,
    primary: false,
  },
];

async function UserData() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_MOCK_API}/boch/get/userlist`
    );
    // const response = await fetch('http://localhost:5000/boch/get/userlist');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const userData = await UserData();

// {
//   "user_list": [
//     {
//       "_id": { "$oid": "652e00a8a3a5baaf3e710e3b" },
//       "userName": "alice",
//       "description": "frontend developer A",
//       "awsAccount": "frontend_dev_A",
//       "gcpAccount": "alice@gmail.com",
//       "attachedPosition": ["Frontend"],
//       "attachedGroup": ["frontend_team"],
//       "updatetime": "2023-09-21T04:46:40.000+00:00"
//     },
//     {
//       "_id": { "$oid": "652e00a8a3a5baaf3e710e3c" },
//       "userName": "bob",
//       "description": "frontend developer B",
//       "awsAccount": "frontend_dev_B",
//       "gcpAccount": "bob@gmail.com",
//       "attachedPosition": ["Frontend"],
//       "attachedGroup": ["frontend_team"],
//       "updatetime": "2023-09-22T04:46:40.000+00:00"
//     },
//   ]
// }

export const _userList = [...Array(userData.user_list.length)].map(
  (_, index) => ({
    // id: userData.user_list[index]._id.$oid,
    id: userData.user_list[index]._id.$oid,
    userName: userData.user_list[index].userName,
    description: userData.user_list[index].description,
    awsAccount: userData.user_list[index].awsAccount,
    gcpAccount: userData.user_list[index].gcpAccount,
    attachedPosition: userData.user_list[index].attachedPosition,
    attachedGroup: userData.user_list[index].attachedGroup,
    updatetime: userData.user_list[index].updatetime,
    csp:
      userData.user_list[index].awsAccount && "aws"
        ? userData.user_list[index].gcpAccount && "gcp"
          ? "aws,gcp"
          : "aws"
        : userData.user_list[index].gcpAccount && "gcp"
        ? "gcp"
        : "none",
    zipCode: "85807",
    state: "Virginia",
    city: "Rancho Cordova",
    role: userData.user_list[index].attachedPosition,
    email: _mock.email(index),
    address: "908 Jack Locks",
    name: userData.user_list[index].userName,
    isVerified: _mock.boolean(index),
    company: _mock.companyName(index),
    country: countries[index + 1].label,
    avatarUrl: _mock.image.avatar(index),
    phoneNumber: _mock.phoneNumber(index),
    status:
      (index % 2 && "aws") ||
      (index % 3 && "gcp") ||
      (index % 4 && "aws,gcp") ||
      "active",
  })
);
// export const _userList = [...Array(20)].map((_, index) => ({
//   id: _mock.id(index),
//   zipCode: '85807',
//   state: 'Virginia',
//   city: 'Rancho Cordova',
//   role: _mock.role(index),
//   email: _mock.email(index),
//   address: '908 Jack Locks',
//   name: _mock.fullName(index),
//   isVerified: _mock.boolean(index),
//   company: _mock.companyName(index),
//   country: countries[index + 1].label,
//   avatarUrl: _mock.image.avatar(index),
//   phoneNumber: _mock.phoneNumber(index),
//   status:
//     (index % 2 && 'pending') || (index % 3 && 'banned') || (index % 4 && 'rejected') || 'active',
// }));
