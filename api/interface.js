import client from "../libs/axios";

const GetInterface = async () => {
  const { data } = await client.get(`/Interface`);
  return data;
};

export { GetInterface };
