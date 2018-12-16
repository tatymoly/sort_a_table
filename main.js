const table = document.getElementById('table');
const url = 'https://jsonplaceholder.typicode.com/users/';

const createElement = element => {
  return document.createElement(element);
};

const append = (parent, el) => {
  return parent.appendChild(el);
};

let sortTable = (column, a, b) => {
  let propertyA = '';
  let propertyB = '';

  switch (column) {
    case 'Id':
      [propertyA, propertyB] = [a.id, b.id];
      break;
    case 'Name':
      [propertyA, propertyB] = [a.name, b.name];
      break;
    case 'Email':
      [propertyA, propertyB] = [a.email, b.email];
      break;
    case 'Company':
      [propertyA, propertyB] = [a.company.name, b.company.name];
      break;
  }

  const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
  const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

  return (valueA < valueB ? -1 : 1) * (valueB < valueA ? -1 : 1);
};

fetch(url)
  .then(response => response.json())
  .then(data => {
    let users = data;
    const loadTable = column => {
      users.sort((a, b) => {
        return sortTable(column, a, b);
      });

      users.map(user => {
        let row = createElement('tr');
        let name = createElement('td');
        let email = createElement('td');
        let id = createElement('td');
        let company = createElement('td');

        name.innerHTML = `${user.name}`;
        email.innerHTML = `${user.email}`;
        id.innerHTML = `${user.id}`;
        company.innerHTML = `${user.company.name}`;

        append(row, id);
        append(row, name);
        append(row, email);
        append(row, company);
        append(table, row);
      });
    };
    loadTable();

    const clickButton = document.querySelectorAll('th');
    clickButton.forEach(e => {
      e.addEventListener('click', e => {
        table.innerHTML = '';
        loadTable(e.target.innerHTML);
      });
    });
  })
  .catch(error => {
    console.log(error);
  });
