import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '28563998-94f39fcb3f5d6102eda4d8ddd',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 10,
  },
});

export const query = async (q, page) => {
  const { data } = await instance.get('/?', {
    params: {
      q,
      page,
    },
  });
  return data;
};