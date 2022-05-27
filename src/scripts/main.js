'use strict';

const baseUrl = 'https://mate-academy.github.io/phone-catalogue-static/api';
const body = document.querySelector('body');
const list = document.createElement('ul');

const request = (url) => {
  return fetch(`${baseUrl}${url}.json`)
    .then(response => {
      return response.ok
        ? response.json()
        : setTimeout(() => Promise.reject(
          new Error(`${response.status}|| ${response.statusText}`)
        ), 5000);
    });
};

const getPhoneDetails = (idArr) => {
  const idUrls = idArr.map(item => fetch(`${baseUrl}/phones/${item}.json`)
    .then(response => {
      return response.json();
    }));

  const phoneDetails = [];

  Promise.all(idUrls)
    .then(response => {
      phoneDetails.push(...response);
    });

  return phoneDetails;
};

const getPhones = () => {
  return request('/phones')
    .then((data) => {
      for (const phone of data) {
        const listItem = document.createElement('li');

        listItem.innerText = phone.name;
        list.append(listItem);
      }

      const ids = data.map(phone => phone.id);

      getPhoneDetails(ids);

      body.append(list);
    });
};

getPhones();
