import client from "../libs/axios";

const GetPeer = async (query) => {
  const { data } = await client.get(`/Peer${query}`);
  return data;
};

const PostPeerInterface = async (interfacename, payload) => {
  const { data } = await client.post(`/Peer/${interfacename}`, payload);
  return data;
};

export { GetPeer, PostPeerInterface };
