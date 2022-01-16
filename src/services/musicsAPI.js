// import fetch from 'node-fetch';

const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`, {header: "https://trybetunes-leonardohenriquedev.vercel.app/"});
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
