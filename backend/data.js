import bcrypt from 'bcryptjs';


let Products = [
  {
    id: 1,
    name: 'Product 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus fringilla orci, vitae hetur.',
    color: 'red',
    size: 'L',
    status: 'active',
    created_at: '2021/06/14',
    updated_at: '2021/06/15',
  },
  {
    id: 2,
    name: 'Product 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus fringilla orci, vitae hendrerit antectetur.',
    color: 'blue',
    size: 'XL',
    status: 'active',
    created_at: '2021/06/14',
    updated_at: '2021/06/15',
  },
  {
    id: 3,
    name: 'Product 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Practetur.',
    color: 'yellow',
    size: 'M',
    status: 'inactive',
    created_at: '2021/06/14',
    updated_at: '2021/06/15',
  },
  {
    id: 4,
    name: 'Product 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus fringilla orci, vitae hendreritr.',
    color: 'green',
    size: 'S',
    status: 'active',
    created_at: '2021/06/14',
    updated_at: '2021/06/15',
  },
  {
    id: 5,
    name: 'Product 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus fringilla orci, vitae hendrerit ctetur.',
    color: 'black',
    size: 'XXL',
    status: 'inactive',

    created_at: '2021/06/14',
    updated_at: '2021/06/15',
  },
];

let Users = [
  {
    _id: '12345678',
    name: 'Francisco',
    email: 'franmackinlay@gmail.com',
    password: bcrypt.hashSync('123456', 8),
  },
]

export function getProducts() {
  return Products;
}

export function updateProduct(product) {
  Products.forEach((p, i) => p.id === product.id ? Products[i] = product : p);
  return Products;
}

export function findAndUpdateUser(user) {
  const updatedUser = user;
  const oldUser = findUserByEmail(user.email);

  updatedUser.password = oldUser.password;
  Users.forEach((u, i) => u._id === user._id ? Users[i] = updatedUser : u);
  return Users.find(user => user._id === updatedUser._id);
}

export function createUser(newUser) {
  const userExists = Users.find(user => user._id === newUser._id);

  if (!userExists) {
    Users.push(newUser);
  }

  return newUser;
}

export function findUser(_id) {
  const user = Users.find(user => user._id === _id);
  return user;
}

export function findUserByEmail(email) {
  const user = Users.find(user => user.email === email);
  return user;
}


export default Products;
