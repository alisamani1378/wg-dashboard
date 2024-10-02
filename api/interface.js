import client from "../libs/axios";

const GetInterface = async () => {
  const { data } = await client.get(`/Interface`);
  return data;
};

const PostConfigurationInterface = async (payload) => {
  const { data } = await client.post(`/Interface`, payload);
  return data;
};

const UpdateConfigurationStatus = async (payload) => {
  const { data } = await client.put(`/Interface`, payload);
  return data;
};

export { GetInterface, PostConfigurationInterface, UpdateConfigurationStatus };
